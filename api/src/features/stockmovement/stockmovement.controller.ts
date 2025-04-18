import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockMovementService } from './stockmovement.service';
import { CreateStockMovementDto } from './dto/stockmovement.dto';

@Controller('stock-movement')
export class StockMovementController {
  constructor(private readonly stockMovementService: StockMovementService) {}

  @Post()
  create(@Body() createStockMovementDto: CreateStockMovementDto) {
    return this.stockMovementService.create(createStockMovementDto);
  }

  @Get()
  findAll() {
    return this.stockMovementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockMovementService.findOne(+id);
  }
}
