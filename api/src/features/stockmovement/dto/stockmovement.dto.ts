import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { TypeMovement } from "src/commons/enum/type_movement";

export class CreateStockMovementDto {
    @IsString()
    @IsNotEmpty()
    @Type(() => Number)
    productId!: number;

    @IsString()
    @IsNotEmpty()
    @IsEnum(TypeMovement)
    type!: TypeMovement;

    @IsNumber()
    @IsNotEmpty()
    stock!: number;
}

export class UpdateStockMovementDto extends PartialType(CreateStockMovementDto) {}
