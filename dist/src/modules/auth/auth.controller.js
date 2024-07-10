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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const public_deco_1 = require("../../decorators/public.deco");
const dtos_1 = require("../../dtos");
const services_1 = require("../../services");
let AuthController = exports.AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async userRegister(response, userDTO) {
        const userRegister = await this.authService.userRegister(userDTO);
        if (userRegister != '444') {
            return response.status(common_1.HttpStatus.CREATED).json({
                type: 'success',
                data: userRegister
            });
        }
        else {
            throw new common_1.HttpException('User Already Exists', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async userLogin(response, body) {
        try {
            const userLogin = await this.authService.userLogin(body.email, body.password);
            return response.status(common_1.HttpStatus.CREATED).json({
                type: 'success',
                data: userLogin
            });
        }
        catch (err) {
            console.log(err);
            if (err === '445') {
                return response.status(common_1.HttpStatus.NOT_FOUND).json({
                    type: 'error',
                    message: 'Invalid Email/Password',
                });
            }
        }
    }
    async userLogout(response, body, token) {
        try {
            const userLogin = await this.authService.userLogout(body.userId, token);
            return response.status(common_1.HttpStatus.CREATED).json({
                type: 'success',
                data: userLogin
            });
        }
        catch (err) {
            return response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                type: 'error',
                message: 'Unable to logout user',
                err
            });
        }
    }
    async getRefreshToken(response, body) {
        try {
            const getRefreshToken = await this.authService.getRefreshToken(body.oldRefreshToken);
            return response.status(common_1.HttpStatus.CREATED).json({
                type: 'success',
                data: getRefreshToken
            });
        }
        catch (err) {
            throw new common_1.UnauthorizedException();
        }
    }
};
__decorate([
    (0, public_deco_1.Public)(),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dtos_1.UserDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userRegister", null);
__decorate([
    (0, public_deco_1.Public)(),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userLogin", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userLogout", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getRefreshToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [services_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map