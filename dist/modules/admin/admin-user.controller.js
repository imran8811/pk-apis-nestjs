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
const admin_user_service_1 = require("../../services/admin-user.service");
const bcrypt = require("bcrypt");
let AdminController = exports.AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async createAdmin(reqData, response) {
        try {
            const saltOrRound = 10;
            const data = {
                fullName: reqData.fullName,
                email: reqData.email,
                password: await bcrypt.hash(reqData.password, saltOrRound)
            };
            const res = await this.adminService.create(data);
            return response.status(common_1.HttpStatus.CREATED).json({
                type: 'success',
                message: 'New Admin user created',
                data: {
                    email: res[0].email,
                    fullName: res[0].fullName
                }
            });
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: User not created!',
                error: 'Bad Request',
                err: err
            });
        }
    }
    async adminLogin(reqData, response) {
        try {
            const saltOrRounds = 10;
            let hasedPassword;
            const adminUser = this.adminService.getAdmin(reqData.email).then(res => res);
            return response.status(common_1.HttpStatus.CREATED).json({
                type: 'success',
                message: 'Signed in successfully',
                token: 'sdfsdfsdfsdfsfd',
                data: adminUser
            });
        }
        catch (err) {
            console.log(err);
        }
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createAdmin", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "adminLogin", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_user_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin-user.controller.js.map