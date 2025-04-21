import { MigrationInterface, QueryRunner } from "typeorm";

export class StockMovement1745006783165 implements MigrationInterface {
    name = 'StockMovement1745006783165'

    public async up(queryRunner: QueryRunner): Promise<void> {        
        await queryRunner.query(`CREATE TABLE \`stock_movement\` (\`id\` varchar(255) NOT NULL, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`product_id\` varchar(255) NOT NULL, \`typemv\` enum ('OUT', 'IN') NOT NULL DEFAULT 'IN', \`quantity\` int NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`stock_movement\` ADD CONSTRAINT \`FK_c1bf5ff45511ecaad0b28440e30\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`stock_movement\` DROP FOREIGN KEY \`FK_c1bf5ff45511ecaad0b28440e30\``);
        await queryRunner.query(`DROP TABLE \`stock_movement\``);        
    }

}
