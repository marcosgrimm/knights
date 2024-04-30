import { IsOptional, IsRFC3339, IsString } from 'class-validator';

export class UpdateKnightDto {
  @IsString()
  nickname: string;

  @IsOptional()
  @IsRFC3339()
  hero_at: Date;
}
