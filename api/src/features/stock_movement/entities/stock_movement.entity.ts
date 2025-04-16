import { Product } from "src/features/product/entities/product.entity";
import { Column, JoinColumn, ManyToOne } from "typeorm";
import { TypeMovement } from '../../../commons/enum/type_movement';
import { IsEnum, IsNotEmpty, IsNumber, Min } from "class-validator";
import { Type } from "class-transformer";

export class StockMovement {
    @ManyToOne(() => Product, { nullable: false })
    @JoinColumn()
    productId!: Product

    @IsEnum(TypeMovement)
    @IsNotEmpty()
    @Column({ type: 'simple-enum', enum: TypeMovement, default: TypeMovement.IN })
    typemv!: TypeMovement

    @IsNumber()
    @Type(() => Number)
    @Min(0)
    @Column({ default: 0 })
    quantity: number

}
