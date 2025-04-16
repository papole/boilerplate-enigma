import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './features/product/product.module';
import { typeOrmConfig } from './typeorm.config';
import { StockMovementModule } from './features/stock_movement/stock_movement.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), 
    ProductModule, StockMovementModule
  ],
})
export class AppModule {}