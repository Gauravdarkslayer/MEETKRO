import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AdminTokenRepository } from './admin.repository';
import { Admin } from './admin.schema';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AdminService {
  constructor(private readonly adminTokenRepository: AdminTokenRepository) {}

  async create(data) {
    await this.adminTokenRepository.create(data);
  }

  async findOne(condition) {
    return await this.adminTokenRepository.findOne(condition);
  }

  async deleteOne(condition) {
    return await this.adminTokenRepository.delete(condition);
  }
}
