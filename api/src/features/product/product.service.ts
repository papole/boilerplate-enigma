import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ProductDto, UpdateProductDto } from './dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

  constructor (
    @InjectRepository(Product) private readonly productRepository: Repository<Product> 
  ){}

  async create(productDto: ProductDto) {   
    try {
      const product = this.productRepository.create(productDto);
      await this.productRepository.save(product);
      return product
    } catch (error) {
      throw new InternalServerErrorException(error);      
    } 
  }

  findAll() {
    return this.productRepository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
