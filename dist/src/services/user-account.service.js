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
exports.UserAccountService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UserAccountService = exports.UserAccountService = class UserAccountService {
    constructor(userModel, userAddressModel) {
        this.userModel = userModel;
        this.userAddressModel = userAddressModel;
    }
    async getUserAccount(id) {
        const userLogin = await this.userModel.findOne({
            _id: id
        }).exec();
        return {
            businessName: userLogin.businessName,
            email: userLogin.email,
            contactNo: userLogin.contactNo,
            createdAt: userLogin.createdAt
        };
    }
    async getUserAddresses(id) {
        const userAddresses = await this.userAddressModel.find({
            userId: id
        }).exec();
        return userAddresses;
    }
    async getUserAddressById(id) {
        const userAddress = await this.userAddressModel.find({
            _id: id
        }).exec();
        return userAddress;
    }
    async createUserAddress(userAddressDTO) {
        const newUserAddress = new this.userAddressModel(userAddressDTO);
        return newUserAddress.save();
    }
    async updateUserAddress(userId, data) {
        let filter = { _id: data.addressId, userId };
        let update = data;
        const updateUserAddress = await this.userAddressModel.findOneAndUpdate(filter, update, { new: true });
        return updateUserAddress;
    }
    async deleteUserAddress(userId, addressId) {
        return await this.userAddressModel.deleteOne({
            _id: addressId,
            userId,
        }).exec();
    }
};
exports.UserAccountService = UserAccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('UserAddress')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UserAccountService);
//# sourceMappingURL=user-account.service.js.map