import { Module, forwardRef } from '@nestjs/common';
import { StockMovementService } from './stockmovement.service';
import { StockMovementController } from './stockmovement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockMovement } from './entities/stockmovement.entity';
import { ProductModule } from '../product/product.module';

@Module({
  controllers: [StockMovementController],
  providers: [StockMovementService],
  imports: [
    TypeOrmModule.forFeature([ StockMovement ]),
    forwardRef(() => ProductModule)
  ],
  exports: [StockMovementService]
})
export class StockMovementModule {}
