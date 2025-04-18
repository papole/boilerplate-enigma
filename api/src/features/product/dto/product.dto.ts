import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ProductDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    sku!: string;

    @IsNumber()
    @IsOptional()    
    stock?: number;
}

export class UpdateProductDto extends PartialType(ProductDto) {}
