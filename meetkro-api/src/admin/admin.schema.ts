import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

export type AdminDocument = Admin & Document;

@Schema({ timestamps: true })
export class Admin {
  @Prop({ required: ['true', 'Name is required!'] })
  name: string;

  @Prop({
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'Email is required!'],
    match: [/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/, 'Email is invalid'],
    index: true,
  })
  email: string;

  @Prop()
  mobile: string;

  @Prop()
  hash: string;

  @Prop()
  salt: string;

  @Prop({ default: true })
  status: boolean;

  public setPassword(password: string) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
      .toString('hex');
  }

  public validPassword(password: string) {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
      .toString('hex');
    return this.hash === hash;
  }

  public generateJwt() {
    return jwt.sign(
      { name: this.name, email: this.email, type: 'ADMIN' },
      process.env.secretKey || 'asda3rfc342#R#Rasd?.,sad',
    );
  }
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
AdminSchema.loadClass(Admin);
