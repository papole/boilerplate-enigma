"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product1744766476460 = void 0;
class Product1744766476460 {
    name = 'Product1744766476460';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL, "deleted_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(100) NOT NULL, "sku" character varying(150) NOT NULL, "stock" integer NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "product"`);
    }
}
exports.Product1744766476460 = Product1744766476460;
//# sourceMappingURL=1744766476460-product.js.map