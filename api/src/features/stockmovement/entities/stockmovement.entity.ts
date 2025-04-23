
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { TypeMovement } from '../../../common/enum/type_movement';
import { EntityBase } from '../../../common/entity/entity-base';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { Type } from "class-transformer";
import { Product } from '../../product/entities/product.entity';

@Entity()
export class StockMovement extends EntityBase {

    @IsString()    
    @IsNotEmpty()
    @Column()
    productId!: string

    @ManyToOne(
        () => Product, 
        ( product ) => product.id,
        { nullable: false }
    )
    product?: Product

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
