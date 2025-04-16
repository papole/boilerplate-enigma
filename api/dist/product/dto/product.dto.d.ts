export declare class ProductDto {
    name: string;
    sku: string;
    stock: number;
}
declare const UpdateProductDto_base: import("@nestjs/mapped-types").MappedType<Partial<ProductDto>>;
export declare class UpdateProductDto extends UpdateProductDto_base {
}
export {};
