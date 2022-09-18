import { Request } from 'express';
import { AdminRepository, AdminTokenRepository } from './admin.repository';
import { Admin } from './admin.schema';
import { LoginDto } from './dtos/login.dto';
export declare class AdminService {
    private readonly adminRepository;
    private readonly adminTokenRepository;
    constructor(adminRepository: AdminRepository, adminTokenRepository: AdminTokenRepository);
    getUsersList(): Promise<Admin[]>;
    create(data: any): Promise<void>;
    login(loginDto: LoginDto, request: Request): Promise<any>;
    findOne(condition: any): Promise<Admin & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteOne(condition: any): Promise<import("mongodb").DeleteResult>;
    findAdminToken(condition: any): Promise<import("./admin-token.schema").AdminToken & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
