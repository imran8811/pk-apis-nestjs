import { AdminService } from 'src/services/admin.service';
import { AdminDTO } from 'src/dtos';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    createAdmin(adminDTO: AdminDTO, response: any): Promise<any>;
    adminUserLogin(response: any, body: any): Promise<any>;
    userLogout(response: any, body: any): Promise<any>;
}
