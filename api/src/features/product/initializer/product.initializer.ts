import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common'

import Products from '../seed/products.json'
import { ProductService } from '../product.service'

@Injectable()
export class productInitializer implements OnModuleInit {
  constructor(@Inject(ProductService) private productService: ProductService) {}

  async onModuleInit() {
    this.initialProductsConfig().catch(e => Logger.log(e))
  }

  private async initialProductsConfig() {
    const products = await this.productService.findAll()
    const productsSet = new Set(products.map(c => c.sku))

    const initialProducts: { name: string; sku: string }[] = Products

    await Promise.all(
      initialProducts.map(async product => {
        const productDB = productsSet.has(product.sku)
        if (!productDB) {
          await this.productService.create(product)
        }
      }),
    )
  }
}