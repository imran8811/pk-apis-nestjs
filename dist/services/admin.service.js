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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
let AdminService = exports.AdminService = class AdminService {
    constructor(adminUserModel, jwtService) {
        this.adminUserModel = adminUserModel;
        this.jwtService = jwtService;
        this.getAdmin = async (email) => {
            return await this.adminUserModel.find({ email: email }).exec();
        };
    }
    async createAdminUser(adminDTO) {
        const saltOrRounds = 10;
        const password = adminDTO.password;
        const hash = await bcrypt.hash(password, saltOrRounds);
        adminDTO.password = hash;
        const registerUser = new this.adminUserModel(adminDTO);
        const res = await registerUser.save();
        const access_token = await this.jwtService.signAsync({ sub: res._id, username: res.email });
        return {
            token: access_token,
        };
    }
    async adminUserLogin(email, password) {
        const userLogin = await this.adminUserModel.findOne({
            email
        }).exec();
        const passwordMatch = await bcrypt.compare(password, userLogin.password);
        if (passwordMatch) {
            const access_token = await this.jwtService.signAsync({ sub: userLogin._id, username: userLogin.email });
            return {
                token: access_token,
            };
        }
        else {
            throw new Error('445');
        }
    }
    async adminLogout(userId) {
        const userExists = await this.adminUserModel.findOne({
            _id: userId
        }).exec();
        return userExists ? true : false;
    }
};
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Admin')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AdminService);
//# sourceMappingURL=admin.service.js.map