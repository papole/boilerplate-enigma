import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto, UpdateProductDto } from './dto/product.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { TypeMovement } from 'src/common/enum/type_movement';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create( @Body() productDto: ProductDto) {
    return this.productService.create(productDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto  ) {
    return this.productService.findAll( paginationDto );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateProductDto: UpdateProductDto,
    @Query('typeMovement') typeMovement?: TypeMovement
  ) {
    if (typeMovement && !Object.values(TypeMovement).includes(typeMovement)) {
      throw new BadRequestException('Invalid typeMovement value');
    }
    return this.productService.update(id, updateProductDto, typeMovement);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
