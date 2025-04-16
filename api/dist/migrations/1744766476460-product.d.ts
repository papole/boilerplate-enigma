import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Product1744766476460 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
