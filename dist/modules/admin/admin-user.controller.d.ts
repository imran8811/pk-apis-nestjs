import { AdminService } from 'src/services/admin-user.service';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    createAdmin(reqData: any, response: any): Promise<any>;
    adminLogin(reqData: any, response: any): Promise<any>;
}
