import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { StockMovementModule } from '../stockmovement/stockmovement.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    TypeOrmModule.forFeature([ Product]),
    forwardRef(() => StockMovementModule),
  ],
  exports:[ ProductService ]
})
export class ProductModule {}
