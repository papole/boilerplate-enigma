import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProductDto, UpdateProductDto } from './dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { StockMovementService } from '../stockmovement/stockmovement.service';

import { PaginationDto } from '../../common/dto/pagination.dto';
import { TypeMovement } from '../../common/enum/type_movement';

@Injectable()
export class ProductService {

  constructor (
    @InjectRepository(Product) 
    private readonly productRepository: Repository<Product>,
    private readonly stockMovementService: StockMovementService,
  ){}

  async create(productDto: ProductDto) {   
    try {
      const { stock } = productDto
      if(stock) if (stock < 0) throw new BadRequestException('stock must be greater than zero')

      const product = this.productRepository.create(productDto);
  
      await this.productRepository.save(product);
      if (product.stock) {
        await this.stockMovementService.create({
          productId: product.id,          
          quantity: product.stock || 0,
          typemv: TypeMovement.IN
        });
      }
      return product
    } catch (error) {
      throw new InternalServerErrorException(error);      
    } 
  }

  async findAll(paginationDto?: PaginationDto) {
    const limit = paginationDto?.limit || 5 
    const page = paginationDto?.page || 1
    const offset = (page - 1) * limit;

    
    const [data, total] = await this.productRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: {
        stockMovement: true,
      },
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      totalPages,
      currentPage: Math.floor(offset / limit) + 1,
    };

  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({where:{ id }, relations:['stockMovement']})
    if(!product){
      throw new NotFoundException(`Producto no encontrato ${id}`)
    }
    return product;
  }

  public async findByIdOrFail(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({where:{id}} );
    if (!product) throw new NotFoundException(`Producto con id ${id} no encontrado`);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto, typeMovement?: TypeMovement) {

    if (!typeMovement && 'stock' in updateProductDto) {
      delete updateProductDto.stock;
    }
    
    if (typeMovement && updateProductDto.stock) {
      const updateProduct = await this.productRepository.preload({
        id,
      });
  
      if (!updateProduct) throw new NotFoundException('Product not found');
  
      const actualStock = updateProduct.stock ?? 0;
  
      let newStock = actualStock;
  
      if (typeMovement === TypeMovement.IN) {
        newStock += updateProductDto.stock;        
      } else if (typeMovement === TypeMovement.OUT) {
        newStock -= updateProductDto.stock;        
      }
  
      if (newStock < 0) throw new BadRequestException('No stock for this request');  
      
      updateProduct.stock = newStock;
  
      // Guardar movimiento
      await this.stockMovementService.create({
        productId: id,
        quantity: updateProductDto.stock,
        typemv: typeMovement,
      });
      return await this.productRepository.save(updateProduct);
    }

    const updateProduct = await this.productRepository.preload({
      id,
      ...updateProductDto
    });

    if (!updateProduct) throw new NotFoundException('Product not found');

    return await this.productRepository.save(updateProduct);
  
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
