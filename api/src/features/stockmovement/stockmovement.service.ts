import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateStockMovementDto } from './dto/stockmovement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockMovement } from './entities/stockmovement.entity';
import { ProductService } from '../product/product.service';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class StockMovementService {
  constructor (
    @InjectRepository(StockMovement) 
    private readonly stockMovementRepository: Repository<StockMovement>,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService
  ){}

  async create(createStockMovementDto: CreateStockMovementDto) {
    const { productId, ...rest } = createStockMovementDto
    const newStockMovement = this.stockMovementRepository.create(rest)
    if (productId) newStockMovement.product = await this.productService.findByIdOrFail(productId)
    return await this.stockMovementRepository.save(newStockMovement);
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 5, offset = 0 } = paginationDto
    return this.stockMovementRepository.find({
      take: limit,
      skip: offset,
      relations:{
        product: true
      }
    });
  }

  async findOne(id: string) {
    const stockMovement = await this.stockMovementRepository.findOneBy({id})
    if(!stockMovement){
      throw new NotFoundException(`Stock movement not found ${id} `)
    }
    return stockMovement;
  }

}
