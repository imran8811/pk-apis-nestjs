import { Model } from 'mongoose';
import { IUser } from 'src/interfaces';
import { UserDTO } from 'src/dtos/';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<IUser>, jwtService: JwtService);
    userRegister(userDTO: UserDTO): Promise<any>;
    userExists(email: string): Promise<boolean>;
    userLogin(email: string, password: string): Promise<any>;
    userLogout(userId: string): Promise<any>;
}
