import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Knight } from './Knight.schema';
import mongoose from 'mongoose';
import { Attributes } from '../enums/attributes.enum';

@Schema()
export class Weapon {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  mod: number;

  @Prop({ required: true })
  attr: Attributes;

  @Prop({ required: false, default: false })
  equipped: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Knight' })
  knight: Knight;
}

export const WeaponSchema = SchemaFactory.createForClass(Weapon);
