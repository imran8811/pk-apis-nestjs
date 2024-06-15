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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductService = exports.ProductService = class ProductService {
    constructor(product, productImages) {
        this.product = product;
        this.productImages = productImages;
    }
    async addProduct(addProductDTO) {
        const newProduct = new this.product(addProductDTO);
        return newProduct.save();
    }
    async updateProduct(productId, data) {
        let filter = { _id: productId };
        let update = data;
        const updateProduct = await this.product.findOneAndUpdate(filter, update, { new: true });
        return updateProduct;
    }
    getProductByCategoryDept(dept, category) {
        const getProducts = this.product.find({
            dept,
            category
        })
            .populate('productImages')
            .exec();
        return getProducts;
    }
    getProductById(productId) {
        const getProductById = this.product.findOne({
            _id: productId
        })
            .populate('productImages')
            .exec();
        return getProductById;
    }
    getProductByCategoryDeptArticleNo(dept, category, productId) {
        const getProductDetails = this.product.find({
            dept: dept,
            category: category,
            _id: productId,
        })
            .populate('productImages')
            .exec();
        return getProductDetails;
    }
    getAllProducts() {
        const getAllProducts = this.product.find().populate('productImages').exec();
        return getAllProducts;
    }
    deleteProductById(articleNo) {
        return this.product.deleteOne({
            articleNo,
        }).exec();
    }
    deleteProductImages(articleNo) {
        return this.productImages.deleteOne({
            articleNo,
        }).exec();
    }
    getLatestArticleNo() {
        const res = this.product.findOne().sort({ 'createdAt': -1 }).exec();
        return res;
    }
    async UpdateProductImagePath(productImageDTO) {
        let doc = await this.productImages.findOne({ articleNo: productImageDTO.articleNo });
        if (doc) {
            if (productImageDTO.frontImgUrl != '') {
                doc.frontImgUrl = productImageDTO.frontImgUrl;
            }
            if (productImageDTO.backImgUrl != '') {
                doc.backImgUrl = productImageDTO.backImgUrl;
            }
            if (productImageDTO.other1ImgUrl != '') {
                doc.other1ImgUrl = productImageDTO.other1ImgUrl;
            }
            if (productImageDTO.other2ImgUrl != '') {
                doc.other2ImgUrl = productImageDTO.other2ImgUrl;
            }
            if (productImageDTO.other3ImgUrl != '') {
                doc.other3ImgUrl = productImageDTO.other3ImgUrl;
            }
            const res = await doc.save();
            this.UpdateProductImageId(productImageDTO.articleNo, res._id);
            return res;
        }
        else {
            const newProductImage = new this.productImages(productImageDTO);
            const res = await newProductImage.save();
            this.UpdateProductImageId(productImageDTO.articleNo, res._id);
        }
    }
    async UpdateProductImageId(articleNo, objectId) {
        return this.product.updateOne({
            articleNo
        }, {
            $push: {
                productImages: objectId
            }
        }, {
            upsert: false,
            new: true
        });
    }
    getProductsByFilters(filters) {
        return this.product.find({
            dept: filters.dept,
            category: filters.category,
            color: filters.color,
            fitting: filters.fitting,
            washType: filters.washType
        }).exec();
    }
};
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Product')),
    __param(1, (0, mongoose_1.InjectModel)('ProductImages')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ProductService);
//# sourceMappingURL=product.service.js.map