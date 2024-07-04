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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schemas_1 = require("../schemas");
let CartService = exports.CartService = class CartService {
    constructor(cartModel) {
        this.cartModel = cartModel;
    }
    getAllItemsByUser(userId) {
        const getCartItems = this.cartModel.find({
            userId
        })
            .populate('productDetails')
            .exec();
        return getCartItems;
    }
    async saveItem(cartDTO) {
        const itemAlreadyExists = await this.itemAlreadyExists(cartDTO.productId, cartDTO.userId);
        if (itemAlreadyExists) {
            const res = this.cartModel.updateOne({
                userId: cartDTO.userId,
                productId: cartDTO.productId
            }, {
                quantity: cartDTO.quantity,
                sizes: cartDTO.sizes,
                instructions: cartDTO.instructions,
                amount: cartDTO.amount
            });
            return res;
        }
        else {
            const saveItem = new this.cartModel(cartDTO);
            const res = await saveItem.save();
            const res2 = this.cartModel.updateOne({
                _id: res._id
            }, {
                $push: {
                    productDetails: cartDTO.productId
                }
            }, {
                upsert: false,
                new: true
            });
            return res2;
        }
    }
    async itemAlreadyExists(productId, userId) {
        return this.cartModel.findOne({
            productId, userId
        }).then(item => {
            if (item)
                return true;
            return false;
        });
    }
    async deleteCartItemByProductId(productId) {
        return this.cartModel.deleteOne({
            productId
        }).exec();
    }
    async updateCartItemUserId(guestUserId, loggedInUserId) {
        const res = this.cartModel.updateOne({
            userId: guestUserId
        }, {
            userId: loggedInUserId
        }, {
            upsert: false,
            new: true
        });
        return res;
    }
    async deleteCartItemByUserId(userId) {
        return this.cartModel.deleteMany({
            userId
        }).exec();
    }
};
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Cart.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CartService);
//# sourceMappingURL=cart.service.js.map