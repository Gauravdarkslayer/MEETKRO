import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserPasswordDocument = UserPasswordToken & Document;

@Schema()
export class UserPasswordToken {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  user_id: string;

  @Prop()
  token: string;

  @Prop({ index: true })
  email: string;
}

export const UserPasswordTokenSchema =
  SchemaFactory.createForClass(UserPasswordToken);
