import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AdminPasswordDocument,
  AdminPasswordToken,
} from './admin-password-token.schema';
import { AdminToken, AdminTokenDocument } from './admin-token.schema';
import { Admin, AdminDocument } from './admin.schema';

@Injectable()
export class AdminRepository {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  async getAll(): Promise<Admin[]> {
    return this.adminModel.find().exec();
  }

  async findOne(condition: any) {
    return this.adminModel.findOne(condition);
  }

  async create(data) {
    const admin = new this.adminModel(data);
    admin.setPassword(data.password);
    await admin.save();
  }

  async delete(condition) {
    return this.adminModel.deleteOne(condition);
  }
}

@Injectable()
export class AdminTokenRepository {
  constructor(
    @InjectModel(AdminToken.name) private adminModel: Model<AdminTokenDocument>,
  ) {}

  create(data) {
    const admin = new this.adminModel(data);
    admin.save();
  }

  findOne(condition: any) {
    return this.adminModel.findOne(condition);
  }
  delete(condition: any) {
    return this.adminModel.deleteOne(condition);
  }
}

@Injectable()
export class AdminPasswordTokenRepository {
  constructor(
    @InjectModel(AdminPasswordToken.name)
    private adminModel: Model<AdminPasswordDocument>,
  ) {}
}
