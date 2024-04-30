import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { KnightsService } from './knights.service';
import { CreateKnightDto } from './dto/CreateKnight.dto';
import { UpdateKnightDto } from './dto/UpdateKnight.dto';
import mongoose from 'mongoose';

@Controller('knights')
export class KnightsController {
  constructor(private knightsService: KnightsService) {}
  @Post()
  createKnight(@Body() createKnightDto: CreateKnightDto) {
    return this.knightsService.createKnight(createKnightDto);
  }
  @Get()
  getKnights(@Query('filter') filter: string) {
    return this.knightsService.getKnights(filter);
  }

  @Get(':id')
  async getKnight(@Param('id') id: string) {
    // TODO implement check on middleware
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid Knight', 404);

    const knight = await this.knightsService.getKnightById(id);
    if (!knight) throw new HttpException('Knight not found', 404);
    return knight;
  }

  @Patch(':id')
  async updateKnight(
    @Param('id') id: string,
    @Body() updateKnightDto: UpdateKnightDto,
  ) {
    // TODO implement check on middleware
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);

    const knight = await this.knightsService.updateKnight(id, updateKnightDto);
    if (!knight) throw new HttpException('Knight not found', 404);
    return knight;
  }

  @Delete(':id')
  async deleteKnight(@Param('id') id: string) {
    console.log('delete id', id);
    // TODO implement check on middleware
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);

    const knight = await this.knightsService.deleteKnight(id);
    if (!knight) throw new HttpException('Knight not found', 404);
    return knight;
  }
}
