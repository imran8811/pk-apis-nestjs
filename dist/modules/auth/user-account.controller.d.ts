import { UserAddressDTO } from 'src/dtos/auth/user-address.dto';
import { UserAccountService } from 'src/services/user-account.service';
export declare class UserAccountController {
    private userAccountService;
    constructor(userAccountService: UserAccountService);
    getUserAccount(response: any, param: any): Promise<any>;
    getUserAddresses(response: any, param: any): Promise<any>;
    createUserAddress(response: any, userAddress: UserAddressDTO): Promise<any>;
}
