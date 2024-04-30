import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Knight } from '../schemas/Knight.schema';
import { Model } from 'mongoose';
import { CreateKnightDto } from './dto/CreateKnight.dto';
import { UpdateKnightDto } from './dto/UpdateKnight.dto';
import { KnightAttributes } from '../schemas/KnightAttributes.schema';
import { Weapon } from '../schemas/Weapon.schema';

@Injectable()
export class KnightsService {
  knights: Knight[] = [];

  constructor(
    @InjectModel(Knight.name) private knightModel: Model<Knight>,
    @InjectModel(KnightAttributes.name)
    private KnightAttributesModel: Model<KnightAttributes>,
    @InjectModel(Weapon.name) private WeaponModel: Model<Weapon>,
  ) {}

  async createKnight({
    attributes,
    weapons,
    ...createKnightDto
  }: CreateKnightDto) {
    const newAttributes = new this.KnightAttributesModel(attributes);
    const savedNewAttributes = await newAttributes.save();

    let weaponIds = [];
    if (weapons) {
      const newWeapons = weapons.map((weapon) => new this.WeaponModel(weapon));
      await Promise.all(newWeapons.map((weapon) => weapon.save()));
      weaponIds = newWeapons.map((weapon) => weapon._id);
    }

    // array of weapon ids
    const newKnight = await new this.knightModel({
      ...createKnightDto,
      attributes: savedNewAttributes?._id,
      weapons: weaponIds,
    }).save();

    return this.knightModel
      .findById(newKnight._id)
      .populate('attributes')
      .populate('weapons');
  }

  getKnights(filter = {}) {
    // If heroes filtered, only return knights that have hero_at empty
    const sanitizedFilter =
      filter === 'heroes' ? { hero_at: { $exists: true } } : {};

    return this.knightModel
      .find(sanitizedFilter)
      .populate('attributes')
      .populate('weapons');
  }

  getKnightById(id: string) {
    return this.knightModel
      .findById(id)
      .populate('attributes')
      .populate('weapons');
  }
  //
  updateKnight(id: string, updateKnightDto: UpdateKnightDto) {
    return this.knightModel.findByIdAndUpdate(id, updateKnightDto, {
      new: true,
    });
  }

  deleteKnight(id: string) {
    const updateKnightDto = { hero_at: new Date() };
    return this.knightModel.findByIdAndUpdate(id, updateKnightDto, {
      new: true,
    });
  }
}
