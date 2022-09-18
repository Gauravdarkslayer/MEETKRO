import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type AdminTokenDocument = AdminToken & Document;

@Schema()
export class AdminToken {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'admin' })
  admin_id: string;

  @Prop()
  token: string;

  @Prop()
  user_agent: string;

  @Prop()
  req_ip: string;
}

export const AdminTokenSchema = SchemaFactory.createForClass(AdminToken);
