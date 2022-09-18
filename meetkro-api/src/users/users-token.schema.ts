import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserTokenDocument = UserToken & Document;

@Schema()
export class UserToken {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  user_id: string;

  @Prop()
  token: string;

  @Prop()
  user_agent: string;

  @Prop()
  req_ip: string;
}

export const UserTokenSchema = SchemaFactory.createForClass(UserToken);
