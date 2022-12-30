import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function initSwagger(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle('Dopamarket 2')
    .setDescription('The eshop API description')
    .setVersion('1.0')
    .addTag('Dopamarket API')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  initSwagger(app);
  await app.listen(3005);
}
bootstrap();
