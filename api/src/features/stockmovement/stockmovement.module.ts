import { Module } from '@nestjs/common';
import { StockMovementService } from './stockmovement.service';
import { StockMovementController } from './stockmovement.controller';

@Module({
  controllers: [StockMovementController],
  providers: [StockMovementService],
})
export class StockMovementModule {}
