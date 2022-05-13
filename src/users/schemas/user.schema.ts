import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop({ unique: true })
  phoneNumber: string;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  previousDay: Date;

  @Prop()
  balance: number;

}

export const UserSchema = SchemaFactory.createForClass(User);
