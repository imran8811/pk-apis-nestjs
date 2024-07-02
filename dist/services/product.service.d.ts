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
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { ProductDTO } from 'src/dtos/product/product.dto';
import { ProductImageDTO } from 'src/dtos/image.dto';
import { IProduct } from 'src/interfaces/product.interface';
import { IProductImage } from 'src/interfaces/image.interface';
export declare class ProductService {
    private product;
    private productImages;
    constructor(product: Model<IProduct>, productImages: Model<IProductImage>);
    addProduct(productDTO: ProductDTO): Promise<IProduct>;
    updateProduct(productId: any, data: any): Promise<any>;
    getProductByCategoryDept(dept: string, category: string): Promise<Omit<import("mongoose").Document<unknown, {}, IProduct> & IProduct & Required<{
        _id: string;
    }>, never>[]>;
    getProductByDept(dept: string): Promise<Omit<import("mongoose").Document<unknown, {}, IProduct> & IProduct & Required<{
        _id: string;
    }>, never>[]>;
    getProductById(productId: number): Promise<import("mongoose").Document<unknown, {}, IProduct> & IProduct & Required<{
        _id: string;
    }>>;
    getProductByCategoryDeptArticleNo(dept: string, category: string, productId: string): Promise<Omit<import("mongoose").Document<unknown, {}, IProduct> & IProduct & Required<{
        _id: string;
    }>, never>[]>;
    getAllProducts(): Promise<Omit<import("mongoose").Document<unknown, {}, IProduct> & IProduct & Required<{
        _id: string;
    }>, never>[]>;
    deleteProductById(articleNo: string): Promise<import("mongodb").DeleteResult>;
    deleteProductImages(articleNo: string): Promise<import("mongodb").DeleteResult>;
    getLatestArticleNo(): Promise<import("mongoose").Document<unknown, {}, IProduct> & IProduct & Required<{
        _id: string;
    }>>;
    UpdateProductImagePath(productImageDTO: ProductImageDTO): Promise<any>;
    UpdateProductImageId(articleNo: any, objectId: any): Promise<any>;
    getProductsByFilters(filters: any): Promise<(import("mongoose").Document<unknown, {}, IProduct> & IProduct & Required<{
        _id: string;
    }>)[]>;
}
