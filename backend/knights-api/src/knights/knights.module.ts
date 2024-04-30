import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Knight, KnightSchema } from '../schemas/Knight.schema';
import { KnightsService } from './knights.service';
import { KnightsController } from './knights.controller';
import { Weapon, WeaponSchema } from '../schemas/Weapon.schema';
import {
  KnightAttributes,
  KnightAttributesSchema,
} from '../schemas/KnightAttributes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Knight.name,
        schema: KnightSchema,
      },
      {
        name: Weapon.name,
        schema: WeaponSchema,
      },
      {
        name: KnightAttributes.name,
        schema: KnightAttributesSchema,
      },
    ]),
  ],
  providers: [KnightsService],
  controllers: [KnightsController],
})
export class KnightsModule {}
