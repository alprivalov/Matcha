import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Autoriser uniquement cette origine (votre frontend)
    credentials: true,
    optionsSuccessStatus: 204, // Réponse pour les requêtes OPTIONS (préférence)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Autoriser uniquement ces méthodes HTTP
    allowedHeaders: 'Authorization,Content-Type, Accept',
  });
  await app.listen(5000);
}
bootstrap();
