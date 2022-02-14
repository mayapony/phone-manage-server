import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = 8080;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  const option = new DocumentBuilder()
    .setTitle('手机管理平台！')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, option);
  SwaggerModule.setup('api', app, document);

  console.log(`api document: http://localhost:${port}/api`);
  await app.listen(port);
}

bootstrap().then((r) => console.log(r));
