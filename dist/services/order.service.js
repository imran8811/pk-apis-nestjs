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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schemas_1 = require("../schemas");
const user_account_service_1 = require("./user-account.service");
let OrderService = exports.OrderService = class OrderService {
    constructor(orderModel, cartModel, userAccountService) {
        this.orderModel = orderModel;
        this.cartModel = cartModel;
        this.userAccountService = userAccountService;
    }
    getAllOrdersByUser(userId) {
        const getOrders = this.orderModel.find({
            userId
        })
            .exec();
        return getOrders;
    }
    async createOrder(orderDTO) {
        const saveItem = new this.orderModel(orderDTO);
        const res = await saveItem.save();
        return res;
    }
    async generateOrderId() {
        const res = await this.orderModel.findOne().sort({ 'createdAt': -1 }).exec();
        return res ? res.orderId : '165566';
    }
    async getShippingAddressById(shippingAddressId) {
        const res = await this.userAccountService.getUserAddressById(shippingAddressId);
        return res;
    }
    async deleteCartItemByUserId(userId) {
        return this.cartModel.deleteOne({
            userId
        }).exec();
    }
};
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(schemas_1.Cart.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        user_account_service_1.UserAccountService])
], OrderService);
//# sourceMappingURL=order.service.js.map