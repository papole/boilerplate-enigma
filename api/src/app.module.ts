import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { typeOrmConfig } from './typeorm.config';
import { StockMovementModule } from './stock-movement/stock-movement.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), 
    ProductModule, StockMovementModule
  ],
})
export class AppModule {}