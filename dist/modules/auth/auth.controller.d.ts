import { UserDTO } from 'src/dtos';
import { AuthService } from 'src/services';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    userRegister(response: any, userDTO: UserDTO): Promise<any>;
    userLogin(response: any, body: any): Promise<any>;
    userLogout(response: any, body: any, token: any): Promise<any>;
    getRefreshToken(response: any, body: any): Promise<any>;
}
