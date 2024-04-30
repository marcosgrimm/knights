import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Attributes } from '../../enums/attributes.enum';

export class CreateWeaponDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  mod: number;

  @IsNotEmpty()
  @IsEnum(Attributes)
  attr: Attributes;

  @IsBoolean()
  @IsOptional()
  equipped: boolean;
}
