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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const cart_dto_1 = require("../../dtos/cart.dto");
const services_1 = require("../../services");
let CartController = exports.CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async getAllItemsByUser(queryParams) {
        const res = this.cartService.getAllItemsByUser(queryParams.userId);
        return res;
    }
    async saveItem(cartDTO, response) {
        try {
            const res = await this.cartService.saveItem(cartDTO);
            return response.status(common_1.HttpStatus.CREATED).json({
                type: 'success',
                message: 'Item added successfully',
                data: res
            });
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                errorCode: 960,
                message: 'Error: Item not added into cart!',
                error: err
            });
        }
    }
    async deleteCartItem(params, response) {
        try {
            const res = await this.cartService.deleteCartItem(params.id);
            return response.status(common_1.HttpStatus.OK).json({
                type: 'success',
                message: 'Item deleted successfully',
                data: res
            });
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                errorCode: 961,
                message: 'Error: Item not deleted from cart!',
                error: err
            });
        }
    }
};
__decorate([
    (0, common_1.Get)('getAll'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getAllItemsByUser", null);
__decorate([
    (0, common_1.Post)('saveItem'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_dto_1.CartDTO, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "saveItem", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "deleteCartItem", null);
exports.CartController = CartController = __decorate([
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [services_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map