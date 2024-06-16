"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const services_1 = require("../../services");
const order_controller_1 = require("./order.controller");
const schemas_1 = require("../../schemas");
let OrderModule = exports.OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: schemas_1.Order.name,
                    schema: schemas_1.OrderSchema
                },
                {
                    name: schemas_1.Cart.name,
                    schema: schemas_1.CartSchema
                }
            ])
        ],
        controllers: [order_controller_1.OrderController],
        providers: [services_1.OrderService, services_1.CartService],
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map