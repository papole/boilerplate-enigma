import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { TypeMovement } from "../../../common/enum/type_movement";

export class CreateStockMovementDto {
    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    productId!: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(TypeMovement)
    typemv!: TypeMovement;

    @IsNumber()
    @IsNotEmpty()
    quantity!: number;
}
