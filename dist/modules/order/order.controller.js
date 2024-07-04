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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const dtos_1 = require("../../dtos");
const services_1 = require("../../services");
let OrderController = exports.OrderController = class OrderController {
    constructor(orderService, cartService) {
        this.orderService = orderService;
        this.cartService = cartService;
    }
    async getAllOrdersByUser(queryParams) {
        let res = await this.orderService.getAllOrdersByUser(queryParams.userId);
        return res;
    }
    async getShippingAddressById(shippingAddressId) {
        const res = await this.orderService.getShippingAddressById(shippingAddressId);
        return res;
    }
    async generateOrderId() {
        const res = await this.orderService.generateOrderId();
        return res ? res : 168898;
    }
    async createOrder(orderDTO, response) {
        try {
            const deleteCartItem = this.deleteCartItemByUserId(orderDTO.userId);
            if (deleteCartItem) {
                let orderId;
                await this.generateOrderId().then(item => {
                    orderId = Number(item) + 20;
                });
                orderDTO = { ...orderDTO, orderId };
                const res = await this.orderService.createOrder(orderDTO);
                return response.status(common_1.HttpStatus.CREATED).json({
                    type: 'success',
                    message: 'Order Placed successfully',
                    data: res
                });
            }
            else {
                return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    errorCode: 966,
                    message: 'Unable to remove cart Items',
                });
            }
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                errorCode: 965,
                message: 'Order not placed, try again',
                error: err
            });
        }
    }
    async deleteCartItemByUserId(userId) {
        const res = await this.cartService.deleteCartItemByUserId(userId);
        return res ? true : false;
    }
};
__decorate([
    (0, common_1.Get)('getAll'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllOrdersByUser", null);
__decorate([
    (0, common_1.Post)('new'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.OrderDTO, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [services_1.OrderService, services_1.CartService])
], OrderController);
//# sourceMappingURL=order.controller.js.map