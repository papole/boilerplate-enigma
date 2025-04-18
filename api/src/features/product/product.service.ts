import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProductDto, UpdateProductDto } from './dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { StockMovementService } from '../stockmovement/stockmovement.service';
import { TypeMovement } from 'src/commons/enum/type_movement';

@Injectable()
export class ProductService {

  constructor (
    @InjectRepository(Product) 
    private readonly productRepository: Repository<Product>,
    private readonly stockMovementService: StockMovementService,
  ){}

  async create(productDto: ProductDto) {   
    try {
      const product = this.productRepository.create(productDto);
  
      await this.productRepository.save(product);
      if (product.stock > 0) {
        await this.stockMovementService.create({
          productId: product.id,          
          quantity: product.stock,
          typemv: TypeMovement.IN
        });
      }
      return product
    } catch (error) {
      throw new InternalServerErrorException(error);      
    } 
  }

  findAll() {
    return this.productRepository.find({});
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({id})
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



  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
