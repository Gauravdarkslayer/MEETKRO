import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
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

  @Prop({ nullable: true })
  mobile: string;

  @Prop({ nullable: true })
  address: string;

  @Prop({ nullable: true })
  hash: string;

  @Prop({ nullable: true })
  salt: string;

  @Prop({ default: true })
  status: boolean;

  @Prop({ nullable: true })
  profileImage: string;


  @Prop({ default: false })
  isOtpVerified: boolean;

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
      { name: this.name, email: this.email, type: 'USER' },
      process.env.secretKey || 'asda3rfc342#R#Rasd?.,sad',
    );
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.loadClass(User);
