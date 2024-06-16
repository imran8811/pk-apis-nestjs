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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = exports.AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async userRegister(userDTO) {
        const checkUserExists = await this.userExists(userDTO.email);
        if (!checkUserExists) {
            const saltOrRounds = 10;
            const password = userDTO.password;
            const hash = await bcrypt.hash(password, saltOrRounds);
            userDTO.password = hash;
            const registerUser = new this.userModel(userDTO);
            const res = await registerUser.save();
            const access_token = await this.jwtService.signAsync({ sub: res._id, username: res.email });
            return {
                token: access_token,
                businessName: res.businessName,
                contactNo: res.contactNo,
                userId: res._id
            };
        }
        else {
            return '444';
        }
    }
    async userExists(email) {
        const findUser = await this.userModel.findOne({
            email
        }).exec();
        if (findUser)
            return true;
        return false;
    }
    async userLogin(email, password) {
        const userLogin = await this.userModel.findOne({
            email
        }).exec();
        const passwordMatch = await bcrypt.compare(password, userLogin.password);
        if (passwordMatch) {
            const access_token = await this.jwtService.signAsync({ sub: userLogin._id, username: userLogin.email });
            return {
                token: access_token,
                businessName: userLogin.businessName,
                contactNo: userLogin.contactNo,
                userId: userLogin._id
            };
        }
        else {
            throw new Error('445');
        }
    }
    async userLogout(userId) {
        const userExists = await this.userModel.findOne({
            _id: userId
        }).exec();
        return userExists ? true : false;
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map