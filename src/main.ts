import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const configService = new ConfigService(".env");

  const app = await NestFactory.create(AppModule);

  await app.listen(configService.get('PORT'));
}
bootstrap();
