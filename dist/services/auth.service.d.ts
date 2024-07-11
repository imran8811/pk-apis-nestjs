/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { IUser } from 'src/interfaces';
import { UserDTO } from 'src/dtos/';
import { JwtService } from '@nestjs/jwt';
import { IRefreshToken } from 'src/interfaces/refresh-token.interface';
export declare class AuthService {
    private userModel;
    private refreshToken;
    private jwtService;
    private httpService;
    constructor(userModel: Model<IUser>, refreshToken: Model<IRefreshToken>, jwtService: JwtService, httpService: HttpService);
    userRegister(userDTO: UserDTO): Promise<any>;
    userExists(email: string): Promise<boolean>;
    userLogin(email: string, password: string): Promise<any>;
    generateRefreshToken(userId: string): Promise<{
        access_token: string;
        refreshToken: any;
    }>;
    saveRefreshToken(refreshToken: string, userId: string): Promise<import("mongoose").Document<unknown, {}, IRefreshToken> & IRefreshToken & Required<{
        _id: string;
    }>>;
    getRefreshToken(refreshToken: string): Promise<void>;
    checkUserCountry(): Promise<boolean>;
    userLogout(userId: string, token: string): Promise<any>;
}
