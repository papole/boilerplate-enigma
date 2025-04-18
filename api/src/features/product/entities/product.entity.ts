import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { EntityBase } from "src/common/entity/entity-base";
import { StockMovement } from "../../stockmovement/entities/stockmovement.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Product extends EntityBase {

    @OneToMany(
        () => StockMovement,
        (stockMovement) => stockMovement.product
    )
    stockMovement?:StockMovement[]

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @Column({ nullable: false, length: 100 })
    name!: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    @Column({ nullable: false, length: 150 })
    sku!: string

    @IsNumber()
    @IsOptional()
    @Column({ nullable: true, default : 0})
    stock?: number
}
