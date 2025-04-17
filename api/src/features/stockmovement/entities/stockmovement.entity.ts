import { Product } from "src/features/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { TypeMovement } from '../../../commons/enum/type_movement';
import { IsEnum, IsNotEmpty, IsNumber, Min } from "class-validator";
import { Type } from "class-transformer";
import { EntityBase } from '../../../commons/entity/entity-base';

@Entity()
export class StockMovement extends EntityBase {
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
