import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateStockMovementDto } from './dto/stockmovement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockMovement } from './entities/stockmovement.entity';
import { ProductService } from '../product/product.service';

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
    
    if (productId) newStockMovement.productId = await this.productService.findByIdOrFail(productId)

    return await this.stockMovementRepository.save(newStockMovement);
    
  }

  findAll() {
    return `This action returns all stockMovement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockMovement`;
  }

}
