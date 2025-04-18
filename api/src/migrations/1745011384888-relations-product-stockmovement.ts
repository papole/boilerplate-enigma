import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationsProductStockmovement1745011384888 implements MigrationInterface {
    name = 'RelationsProductStockmovement1745011384888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_movement" DROP CONSTRAINT "FK_2f7a7c47f8f9f0b1834a3ccb294"`);
        await queryRunner.query(`ALTER TABLE "stock_movement" RENAME COLUMN "product_id_id" TO "product_id"`);
        await queryRunner.query(`ALTER TABLE "stock_movement" ADD CONSTRAINT "FK_c1bf5ff45511ecaad0b28440e30" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_movement" DROP CONSTRAINT "FK_c1bf5ff45511ecaad0b28440e30"`);
        await queryRunner.query(`ALTER TABLE "stock_movement" RENAME COLUMN "product_id" TO "product_id_id"`);
        await queryRunner.query(`ALTER TABLE "stock_movement" ADD CONSTRAINT "FK_2f7a7c47f8f9f0b1834a3ccb294" FOREIGN KEY ("product_id_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
