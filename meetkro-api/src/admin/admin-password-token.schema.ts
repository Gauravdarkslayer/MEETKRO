import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type AdminPasswordDocument = AdminPasswordToken & Document;

@Schema()
export class AdminPasswordToken {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'admin' })
  admin_id: string;

  @Prop()
  token: string;

  @Prop({ index: true })
  email: string;
}

export const AdminPasswordSchema =
  SchemaFactory.createForClass(AdminPasswordToken);
