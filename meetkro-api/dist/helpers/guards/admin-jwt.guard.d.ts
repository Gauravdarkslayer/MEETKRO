import { AdminService } from '../../admin/admin.service';
import { Strategy } from 'passport-jwt';
import { UserService } from 'src/users/users.service';
declare const AdminAuthGuard_base: new (...args: any[]) => Strategy;
export declare class AdminAuthGuard extends AdminAuthGuard_base {
    private readonly adminService;
    private readonly userService;
    constructor(adminService: AdminService, userService: UserService);
    validate(token: any): Promise<(import("../../admin/admin.schema").Admin & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | (import("../../users/users.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })>;
}
export {};
