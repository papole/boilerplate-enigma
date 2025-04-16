import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { EntityBase } from "src/commons/entity/entity-base";
import { Column, Entity } from "typeorm";

@Entity()
export class Product extends EntityBase {
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
    @IsNotEmpty()
    @Column({ nullable: false})
    stock!: number
}
