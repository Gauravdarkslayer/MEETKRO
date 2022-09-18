import { AdminService } from './admin.service';
import { LoginDto } from './dtos/login.dto';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    getUsersList(): Promise<import("./admin.schema").Admin[]>;
    login(loginDto: LoginDto, request: any): any;
    seesds(): Promise<"created" | "NO">;
}
