/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoginDto } from './dtos/login.dto';
import { IPaginate } from '../helpers/interfaces/paginate.dto';
import { SignupDto } from './dtos/signup.dto';
import { UserService } from './users.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUsersList(): Promise<Array<UserDto>>;
    login(loginDto: LoginDto, request: any): any;
    signup(signupDto: SignupDto, request: any): any;
    verifyToken(token: string): Promise<any>;
    getUsersByPagination(data: IPaginate): Promise<{
        statusCode: HttpStatus;
        users: import("./users.schema").User[];
        draw: number;
        recordsTotal: number;
        recordsFiltered: number;
    }>;
    getProfile(req: any): Promise<any>;
    updateProfile(data: any, req: any): Promise<any>;
    changePassword(data: any, req: any): Promise<any>;
    uploadFile(file: Express.Multer.File, req: any): Promise<object>;
    findProfileImage(imagename: string, res: any): Observable<Object>;
    forgotPassword(data: {
        email: string;
    }): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    verifyOtp(data: {
        otp: string;
    }): Promise<{
        status: HttpStatus;
        message: string;
        data: {
            token: any;
        };
    }>;
    resetPassword(data: {
        token: string;
        password: string;
    }): Promise<{
        status: HttpStatus;
        message: string;
    }>;
}
