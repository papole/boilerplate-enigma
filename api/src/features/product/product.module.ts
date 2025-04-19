import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { StockMovementModule } from '../stockmovement/stockmovement.module';
import { productInitializer } from './initializer/product.initializer';

@Module({
  controllers: [ProductController],
  providers: [ProductService, productInitializer],
  imports: [
    TypeOrmModule.forFeature([ Product]),
    forwardRef(() => StockMovementModule),
  ],
  exports:[ ProductService ]
})
export class ProductModule {}
