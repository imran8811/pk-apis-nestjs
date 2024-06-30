import { Model } from 'mongoose';
import { IUser } from 'src/interfaces';
import { JwtService } from '@nestjs/jwt';
export declare class UserAccountService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<IUser>, jwtService: JwtService);
    getUserAccount(id: string): Promise<any>;
}
