import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IGenericRepository } from '../core/interfaces/generic.repository';
import {
  UserPasswordDocument,
  UserPasswordToken,
} from './users-password-token.schema';
import { UserToken, UserTokenDocument } from './users-token.schema';
import { User, UserDocument } from './users.schema';

// user.repository.ts
@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(...condition): Promise<User[]> {
    return this.userModel.find(...condition).exec();
  }

  async findOne(condition: any) {
    return this.userModel.findOne(condition);
  }

  async create(data) {
    const user = new this.userModel(data);
    // user.setPassword(data.password);
    await user.save();
    return user;
  }

  async delete(condition) {
    return this.userModel.deleteOne(condition);
  }

  async updateOne(condition, data) {
    return this.userModel.updateOne(condition, data);
  }

  async count(condition?) {
    return this.userModel.countDocuments(condition);
  }
}

@Injectable()
export class UserTokenRepository {
  constructor(
    @InjectModel(UserToken.name) private userModel: Model<UserTokenDocument>,
  ) {}
  create(data) {
    const admin = new this.userModel(data);
    admin.save();
  }
  findOne(condition) {
    return this.userModel.findOne(condition);
  }
}

@Injectable()
export class UserPasswordTokenRepository {
  constructor(
    @InjectModel(UserPasswordToken.name)
    private userModel: Model<UserPasswordDocument>,
  ) {}

  async create(data) {
    const user = new this.userModel(data);
    await user.save();
    return user;
  }

  async findOne(condition) {
    return this.userModel.findOne(condition);
  }

  async deleteOne(condition) {
    return this.userModel.deleteOne(condition);
  }
}

// export class UserGenericRepository<T> implements IGenericRepository<T> {
//   private _repository: Model<T>;
//   private _populateOnFind: string[];

//   constructor(repository: any, populateOnFind: string[] = []) {
//     console.log({ repository });
//     this._repository = repository;
//     this._populateOnFind = populateOnFind;
//   }

//   getAll(): Promise<T[]> {
//     return this._repository.find().populate(this._populateOnFind).exec();
//   }

//   get(id: string): Promise<any> {
//     return this._repository.findById(id).populate(this._populateOnFind).exec();
//   }

//   create(item: T): Promise<T> {
//     return this._repository.create(item);
//   }

//   update(id: string, item: T) {
//     return this._repository.findByIdAndUpdate(id, item);
//   }
// }
