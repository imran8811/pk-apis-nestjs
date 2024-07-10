"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_controller_1 = require("./auth.controller");
const user_account_controller_1 = require("./user-account.controller");
const services_1 = require("../../services");
const schemas_1 = require("../../schemas");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../../constants");
const auth_guard_1 = require("../../auth.guard");
const core_1 = require("@nestjs/core");
const user_account_service_1 = require("../../services/user-account.service");
const user_address_schema_1 = require("../../schemas/user-address.schema");
const refresh_token_schema_1 = require("../../schemas/refresh-token.schema");
let AuthModule = exports.AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: schemas_1.User.name,
                    schema: schemas_1.UserSchema
                },
                {
                    name: user_address_schema_1.UserAddress.name,
                    schema: user_address_schema_1.UserAddressSchema
                },
                {
                    name: refresh_token_schema_1.RefreshToken.name,
                    schema: refresh_token_schema_1.RefreshTokenSchema
                }
            ]),
            jwt_1.JwtModule.registerAsync({
                useFactory: () => ({
                    secret: constants_1.jwtConstants.secret,
                    signOptions: { expiresIn: '7d' },
                })
            }),
        ],
        controllers: [auth_controller_1.AuthController, user_account_controller_1.UserAccountController],
        providers: [
            services_1.AuthService,
            user_account_service_1.UserAccountService,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map