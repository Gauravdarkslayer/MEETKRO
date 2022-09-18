import { HttpStatus } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UserRepository, UserTokenRepository, UserPasswordTokenRepository } from './users.repository';
import { User } from './users.schema';
import { Request } from 'express';
import { SignupDto } from './dtos/signup.dto';
import { MailService } from 'src/helpers/services/mail.service';
import { IPaginate } from '../helpers/interfaces/paginate.dto';
export declare class UserService {
    private readonly userRepository;
    private readonly userTokenRepository;
    private readonly userPasswordTokenRepository;
    private readonly mailService;
    constructor(userRepository: UserRepository, userTokenRepository: UserTokenRepository, userPasswordTokenRepository: UserPasswordTokenRepository, mailService: MailService);
    getUsersList(): Promise<User[]>;
    create(data: any): Promise<void>;
    login(loginDto: LoginDto, request: Request): Promise<any>;
    signup(signupDto: SignupDto, request: Request): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    findOne(condition: any): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteOne(condition: any): Promise<import("mongodb").DeleteResult>;
    verifyToken(token: string): Promise<import("./users-password-token.schema").UserPasswordToken & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateOne(condition: any, data: any): Promise<import("mongodb").UpdateResult>;
    userList(data: IPaginate): Promise<{
        statusCode: HttpStatus;
        users: User[];
        draw: number;
        recordsTotal: number;
        recordsFiltered: number;
    }>;
    findUserToken(condition: any): Promise<import("./users-token.schema").UserToken & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updatePassword(condition: any, data: any): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    forgotPassword(email: string): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    verifyOTP(otp: string): Promise<{
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
