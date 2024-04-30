import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { KnightsModule } from './knights/knights.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Cluster54731:jvzdGJNEu5dae0am@cluster54731.x5idfmh.mongodb.net/knightsdb',
    ),
    KnightsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
