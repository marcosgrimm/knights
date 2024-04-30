import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAttributesDto {
  @IsNotEmpty()
  @IsNumber()
  strength: number;

  @IsNotEmpty()
  @IsNumber()
  dexterity: number;

  @IsNotEmpty()
  @IsNumber()
  constitution: number;

  @IsNotEmpty()
  @IsNumber()
  intelligence: number;

  @IsNotEmpty()
  @IsNumber()
  wisdom: number;

  @IsNotEmpty()
  @IsNumber()
  charisma: number;
}
