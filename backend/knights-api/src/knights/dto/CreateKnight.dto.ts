import { Weapon } from '../../schemas/Weapon.schema';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAttributesDto } from '../../knightAttributes/dto/CreateKnightAttributes.dto';
import { CreateWeaponDto } from '../../weapons/dto/CreateWeapon.dto';
import { Attributes } from '../../enums/attributes.enum';

export class CreateKnightDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsEnum(Attributes)
  keyAttribute: string;

  @IsDateString()
  birthday?: Date;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateWeaponDto)
  weapons?: CreateWeaponDto[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateAttributesDto)
  attributes: CreateAttributesDto;
}
