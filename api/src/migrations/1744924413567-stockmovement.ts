import { MigrationInterface, QueryRunner } from "typeorm";

export class Stockmovement1744924413567 implements MigrationInterface {
    name = 'Stockmovement1744924413567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."stock_movement_typemv_enum" AS ENUM('OUT', 'IN')`);
        await queryRunner.query(`CREATE TABLE "stock_movement" ("id" uuid NOT NULL, "deleted_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "typemv" "public"."stock_movement_typemv_enum" NOT NULL DEFAULT 'IN', "quantity" integer NOT NULL DEFAULT '0', "product_id_id" uuid NOT NULL, CONSTRAINT "PK_9fe1232f916686ae8cf00294749" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "stock_movement" ADD CONSTRAINT "FK_2f7a7c47f8f9f0b1834a3ccb294" FOREIGN KEY ("product_id_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_movement" DROP CONSTRAINT "FK_2f7a7c47f8f9f0b1834a3ccb294"`);
        await queryRunner.query(`DROP TABLE "stock_movement"`);
        await queryRunner.query(`DROP TYPE "public"."stock_movement_typemv_enum"`);
    }

}
