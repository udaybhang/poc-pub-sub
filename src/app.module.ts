import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigureModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/config.service';
import { PubMessageModule } from './pub/pub-message.module';

@Module({
  imports: [
    ConfigureModule,
    PubMessageModule,
    
    // MongooseModule.forRootAsync({
    //   imports: [ConfigureModule],
    //   inject: [ConfigService]
    // })
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
