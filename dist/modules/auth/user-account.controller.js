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
exports.UserAccountController = void 0;
const common_1 = require("@nestjs/common");
const user_address_dto_1 = require("../../dtos/auth/user-address.dto");
const user_account_service_1 = require("../../services/user-account.service");
let UserAccountController = exports.UserAccountController = class UserAccountController {
    constructor(userAccountService) {
        this.userAccountService = userAccountService;
    }
    async getUserAccount(response, param) {
        const userAccount = await this.userAccountService.getUserAccount(param.id);
        if (userAccount) {
            return response.status(common_1.HttpStatus.CREATED).json({
                type: 'success',
                data: userAccount
            });
        }
        else {
            throw new common_1.HttpException('User Not Found', common_1.HttpStatus.NO_CONTENT);
        }
    }
    async getUserAddresses(response, param) {
        const userAddresses = await this.userAccountService.getUserAddresses(param.id);
        if (userAddresses) {
            return response.status(common_1.HttpStatus.CREATED).json({
                type: 'success',
                data: userAddresses
            });
        }
        else {
            throw new common_1.HttpException('User Not Found', common_1.HttpStatus.NO_CONTENT);
        }
    }
    async createUserAddress(response, userAddress) {
        try {
            const createUserAddress = await this.userAccountService.createUserAddress(userAddress);
            return response.status(common_1.HttpStatus.CREATED).json({
                type: 'success',
                message: 'User address added successfully',
                data: createUserAddress
            });
        }
        catch (err) {
            return response.status(common_1.HttpStatus.NOT_FOUND).json({
                type: 'error',
                message: 'Unable to add user address',
            });
        }
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserAccountController.prototype, "getUserAccount", null);
__decorate([
    (0, common_1.Get)('user-address/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserAccountController.prototype, "getUserAddresses", null);
__decorate([
    (0, common_1.Post)('user-address'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_address_dto_1.UserAddressDTO]),
    __metadata("design:returntype", Promise)
], UserAccountController.prototype, "createUserAddress", null);
exports.UserAccountController = UserAccountController = __decorate([
    (0, common_1.Controller)('user-account'),
    __metadata("design:paramtypes", [user_account_service_1.UserAccountService])
], UserAccountController);
//# sourceMappingURL=user-account.controller.js.map