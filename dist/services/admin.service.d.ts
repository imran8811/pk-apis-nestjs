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
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { IAdminUser } from 'src/interfaces/admin-user.interface';
import { AdminDTO } from 'src/dtos';
export declare class AdminService {
    private adminUserModel;
    private jwtService;
    constructor(adminUserModel: Model<IAdminUser>, jwtService: JwtService);
    createAdminUser(adminDTO: AdminDTO): Promise<any>;
    adminUserLogin(email: string, password: string): Promise<any>;
    getAdmin: (email: string) => Promise<(import("mongoose").Document<unknown, {}, IAdminUser> & IAdminUser & Required<{
        _id: string;
    }>)[]>;
    adminLogout(userId: string): Promise<any>;
}
