import { AdminTokenRepository } from './admin.repository';
export declare class AdminService {
    private readonly adminTokenRepository;
    constructor(adminTokenRepository: AdminTokenRepository);
    create(data: any): Promise<void>;
    findOne(condition: any): Promise<import("./admin-token.schema").AdminToken & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteOne(condition: any): Promise<import("mongodb").DeleteResult>;
}
