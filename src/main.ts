import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // configurando o uso de pipes para validação
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // configurando o cors
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // adicionando as configurações do swagger
  const config = new DocumentBuilder()
    .setTitle('JSMotion Studio API')
    .setDescription(
      'API para o registro e upload de videos na plataforma JSMotion Studio',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/', app, document);

  // iniciando o servidor
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
