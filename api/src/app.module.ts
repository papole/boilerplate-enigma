import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';

import { ProductModule } from './features/product/product.module';
import { StockMovementModule } from './features/stockmovement/stockmovement.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), 
    ProductModule, StockMovementModule
  ],
})
export class AppModule {}