import { Product } from "./product";

export interface StockMovements {
    id: string;
    productId: string;
    product: Product;
    typemv: string;
    quantity: number
  }