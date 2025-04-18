import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StockMovementService } from './stockmovement.service';
import { CreateStockMovementDto } from './dto/stockmovement.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Controller('stock-movement')
export class StockMovementController {
  constructor(private readonly stockMovementService: StockMovementService) {}

  @Post()
  create(@Body() createStockMovementDto: CreateStockMovementDto) {
    return this.stockMovementService.create(createStockMovementDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto ) {
    return this.stockMovementService.findAll( paginationDto );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockMovementService.findOne(id);
  }
}
