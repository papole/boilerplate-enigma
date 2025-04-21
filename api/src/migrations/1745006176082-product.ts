import { MigrationInterface, QueryRunner } from "typeorm";

export class Product1745006176082 implements MigrationInterface {
    name = 'Product1745006176082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` varchar(255) NOT NULL, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(100) NOT NULL, \`sku\` varchar(150) NOT NULL, \`stock\` int NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`product\``);
    }

}
