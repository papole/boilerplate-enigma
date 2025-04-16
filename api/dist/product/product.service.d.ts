import { ProductDto, UpdateProductDto } from './dto/product.dto';
export declare class ProductService {
    create(productDto: ProductDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateProductDto: UpdateProductDto): string;
    remove(id: number): string;
}
