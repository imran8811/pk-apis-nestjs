import { Document } from "mongoose";
export interface IAdminUser extends Document {
    readonly joinedAt?: Date;
    readonly createdAt?: Date;
    readonly fullName: string;
    readonly email: string;
    readonly password: string;
    data?: string[];
}
