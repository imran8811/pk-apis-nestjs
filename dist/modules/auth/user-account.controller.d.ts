import { UserAccountService } from 'src/services/user-account.service';
export declare class UserAccountController {
    private userAccountService;
    constructor(userAccountService: UserAccountService);
    getUserAccount(response: any, param: any): Promise<any>;
}
