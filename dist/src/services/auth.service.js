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
const uuid_1 = require("uuid");
const jwt_1 = require("@nestjs/jwt");
let AuthService = exports.AuthService = class AuthService {
    constructor(userModel, refreshToken, jwtService) {
        this.userModel = userModel;
        this.refreshToken = refreshToken;
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
        const userLogin = await this.userModel.findOne({ email }).exec();
        const passwordMatch = await bcrypt.compare(password, userLogin.password);
        if (passwordMatch) {
            const access_token = await this.jwtService.signAsync({ sub: userLogin._id });
            const refreshToken = (0, uuid_1.v4)();
            await this.saveRefreshToken(refreshToken, userLogin._id);
            return {
                token: access_token,
                refreshToken,
                businessName: userLogin.businessName,
                contactNo: userLogin.contactNo,
                userId: userLogin._id,
            };
        }
        else {
            throw new Error('445');
        }
    }
    async generateRefreshToken(userId) {
        const access_token = await this.jwtService.signAsync({ sub: userId });
        const refreshToken = (0, uuid_1.v4)();
        const res = await this.saveRefreshToken(refreshToken, userId);
        return {
            access_token,
            refreshToken
        };
    }
    async saveRefreshToken(refreshToken, userId) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 3);
        const createRefreshToken = await this.refreshToken.create({ refreshToken, userId, expiryDate });
        return createRefreshToken;
    }
    async getRefreshToken(refreshToken) {
        const verifyRefreshToken = this.refreshToken.findOneAndDelete({
            refreshToken,
            expiryDate: { $gte: new Date() }
        });
        if (verifyRefreshToken) {
        }
    }
    async userLogout(userId, token) {
        const decoded = this.jwtService.verify(token.split(' ')[1], { 'secret': 'lkdjfldkjfklsd0980980f9sd8f0sd98f0s9d8f//$$$098098' });
        if (decoded.sub) {
            const userExists = await this.userModel.findOne({
                _id: userId
            }).exec();
            return userExists._id === decoded.sub ? true : false;
        }
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('RefreshToken')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map