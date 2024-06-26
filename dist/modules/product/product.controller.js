"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const public_deco_1 = require("../../decorators/public.deco");
const dtos_1 = require("../../dtos");
const image_dto_1 = require("../../dtos/image.dto");
const product_service_1 = require("../../services/product.service");
let ProductController = exports.ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async getAllProducts() {
        const res = await this.productService.getAllProducts();
        return res;
    }
    async getProductById(param) {
        const res = await this.productService.getProductById(param.id);
        return res;
    }
    async getProductByCategoryDeptArticleNo(param) {
        const res = await this.productService.getProductByCategoryDeptArticleNo(param.dept, param.category, param.id);
        return res;
    }
    async getProductByCategoryDept(param) {
        const res = await this.productService.getProductByCategoryDept(param.dept, param.category);
        return res;
    }
    async getLatestArticleNo() {
        const res = await this.productService.getLatestArticleNo();
        return res ? res.articleNo : '10050';
    }
    async UpdateProductImagePath(response, productImageDTO) {
        try {
            const res = await this.productService.UpdateProductImagePath(productImageDTO);
            return response.status(common_1.HttpStatus.CREATED).json({
                type: 'success',
                message: 'Image path updates',
                data: res
            });
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Product not created!',
                error: err
            });
        }
    }
    async addProduct(response, addProductDTO) {
        try {
            const newProduct = await this.productService.addProduct(addProductDTO);
            return response.status(common_1.HttpStatus.CREATED).json({
                type: 'success',
                message: 'new Product has been added successfully',
                data: newProduct
            });
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Product not created!',
                error: err
            });
        }
    }
    async updateProduct(response, body, params) {
        try {
            const updateProduct = await this.productService.updateProduct(params.id, body);
            return response.status(common_1.HttpStatus.ACCEPTED).json({
                type: 'success',
                message: 'Product has been updated successfully',
                data: updateProduct
            });
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Product not updated!',
                error: err
            });
        }
    }
    async getProductByFilters(response, productFilterDTO) {
        try {
            const filteredProducts = await this.productService.getProductsByFilters(productFilterDTO);
            return response.status(common_1.HttpStatus.OK).json({
                type: 'success',
                data: filteredProducts
            });
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Product not Found!',
                error: 'Bad Request'
            });
        }
    }
    async deleteProductById(response, param) {
        try {
            const productDelRes = await this.productService.deleteProductById(param.articleNo);
            const productImagesDelRes = await this.deleteProductImages(param.articleNo);
            return response.status(common_1.HttpStatus.OK).json({
                type: 'success',
                productDelRes,
                productImagesDelRes
            });
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Unable to delete!',
                error: 'Bad Request'
            });
        }
    }
    async deleteProductImages(articleNo) {
        const res = await this.productService.deleteProductImages(articleNo);
        return res;
    }
};
__decorate([
    (0, public_deco_1.Public)(),
    (0, common_1.Get)('getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProducts", null);
__decorate([
    (0, public_deco_1.Public)(),
    (0, common_1.Get)('details/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductById", null);
__decorate([
    (0, public_deco_1.Public)(),
    (0, common_1.Get)(':dept/:category/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductByCategoryDeptArticleNo", null);
__decorate([
    (0, public_deco_1.Public)(),
    (0, common_1.Get)(':dept/:category'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductByCategoryDept", null);
__decorate([
    (0, public_deco_1.Public)(),
    (0, common_1.Get)('getLatestArticleNo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getLatestArticleNo", null);
__decorate([
    (0, public_deco_1.Public)(),
    (0, common_1.Post)('update-image-path'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, image_dto_1.ProductImageDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "UpdateProductImagePath", null);
__decorate([
    (0, public_deco_1.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dtos_1.ProductDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Post)('GetProductsByFilters'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dtos_1.ProductFilterDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductByFilters", null);
__decorate([
    (0, common_1.Delete)(':articleNo'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProductById", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map