import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AdminRepository, AdminTokenRepository } from './admin.repository';
import { Admin } from './admin.schema';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly adminTokenRepository: AdminTokenRepository,
  ) {}

  async getUsersList(): Promise<Admin[]> {
    return await this.adminRepository.getAll();
  }

  async create(data) {
    this.adminRepository.create(data);
  }

  async login(loginDto: LoginDto, request: Request): Promise<any> {
    // try {
    const { email, password } = loginDto;
    const adminUser = await this.adminRepository.findOne({ email });
    if (adminUser) {
      if (adminUser.validPassword(password)) {
        if (adminUser.status) {
          const token = await adminUser.generateJwt();
          const reqIp = request.socket.remoteAddress.split(':')[3] || '';
          const tokenObj = {
            admin_id: adminUser._id,
            token,
            req_ip: reqIp,
            user_agent: request.headers['user-agent'],
          };
          this.adminTokenRepository.create(tokenObj);
          const adminUserData = {
            _id: adminUser._id,
            name: adminUser.name,
            email: adminUser.email,
            mobile: adminUser.mobile,
          };
          return {
            status: HttpStatus.OK,
            message: 'success',
            data: {
              token: token,
              admin_user_data: adminUserData,
            },
          };
        } else {
          throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
      } else {
        throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }
    // } catch (error) {
    //   console.error(error);
    //   throw new HttpException(
    //     'Internal server error',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }

  async findOne(condition) {
    return this.adminRepository.findOne(condition);
  }

  async deleteOne(condition) {
    return this.adminRepository.delete(condition);
  }

  async findAdminToken(condition) {
    return this.adminTokenRepository.findOne(condition);
  }
}
