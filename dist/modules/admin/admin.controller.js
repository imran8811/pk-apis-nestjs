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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("../../services/admin.service");
const public_deco_1 = require("../../decorators/public.deco");
const dtos_1 = require("../../dtos");
let AdminController = exports.AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async createAdmin(adminDTO, response) {
        try {
            const res = await this.adminService.createAdminUser(adminDTO);
            return response.status(common_1.HttpStatus.CREATED).json({
                type: 'success',
                message: 'New Admin user created',
                data: res
            });
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: err.message,
                error: 'Bad Request',
                err: err
            });
        }
    }
    async adminUserLogin(response, body) {
        try {
            const adminUserLogin = await this.adminService.adminUserLogin(body.email, body.password);
            return response.status(common_1.HttpStatus.CREATED).json({
                type: 'success',
                data: adminUserLogin
            });
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                type: 'error',
                message: 'Invalid Email/Password',
            });
        }
    }
    async userLogout(response, body) {
        try {
            const userLogin = await this.adminService.adminLogout(body.userId);
            return response.status(common_1.HttpStatus.CREATED).json({
                type: 'success',
                data: userLogin
            });
        }
        catch (err) {
            return response.status(common_1.HttpStatus.NOT_FOUND).json({
                type: 'error',
                message: 'Unable to logout user',
            });
        }
    }
};
__decorate([
    (0, public_deco_1.Public)(),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.AdminDTO, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createAdmin", null);
__decorate([
    (0, public_deco_1.Public)(),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "adminUserLogin", null);
__decorate([
    (0, public_deco_1.Public)(),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "userLogout", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map