/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ProductDTO, ProductFilterDTO } from 'src/dtos';
import { ProductImageDTO } from 'src/dtos/image.dto';
import { ProductService } from 'src/services/product.service';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    getAllProducts(): Promise<Omit<import("mongoose").Document<unknown, {}, import("../../interfaces").IProduct> & import("../../interfaces").IProduct & Required<{
        _id: string;
    }>, never>[]>;
    getProductById(param: any): Promise<import("mongoose").Document<unknown, {}, import("../../interfaces").IProduct> & import("../../interfaces").IProduct & Required<{
        _id: string;
    }>>;
    getProductByCategoryDeptArticleNo(param: any): Promise<Omit<import("mongoose").Document<unknown, {}, import("../../interfaces").IProduct> & import("../../interfaces").IProduct & Required<{
        _id: string;
    }>, never>[]>;
    getProductByCategoryDept(param: any): Promise<Omit<import("mongoose").Document<unknown, {}, import("../../interfaces").IProduct> & import("../../interfaces").IProduct & Required<{
        _id: string;
    }>, never>[]>;
    getLatestArticleNo(): Promise<string>;
    UpdateProductImagePath(response: any, productImageDTO: ProductImageDTO): Promise<any>;
    addProduct(response: any, addProductDTO: ProductDTO): Promise<any>;
    updateProduct(response: any, body: any, params: any): Promise<any>;
    getProductByFilters(response: any, productFilterDTO: ProductFilterDTO): Promise<any>;
    deleteProductById(response: any, param: any): Promise<any>;
    deleteProductImages(articleNo: string): Promise<import("mongodb").DeleteResult>;
}
