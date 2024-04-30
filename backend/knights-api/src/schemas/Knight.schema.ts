import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { KnightAttributes } from './KnightAttributes.schema';
import { Weapon } from './Weapon.schema';
import mongoose from 'mongoose';
import { Attributes } from '../enums/attributes.enum';

@Schema()
export class Knight {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  keyAttribute: Attributes;

  @Prop({ required: false })
  birthday?: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'KnightAttributes' })
  attributes: KnightAttributes;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Weapon' }] })
  weapons: Weapon[];
  ß;
  @Prop({ required: false })
  hero_at: Date;
}

export const KnightSchema = SchemaFactory.createForClass(Knight);
