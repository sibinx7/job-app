import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { SwaggerModule } from "@nestjs/swagger";
import swaggerConfig from "./config/swagger.config.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
    logger: ['error'],
    cors: true
  });

  app.enableCsrfProtection({
    trustedOrigins: ['http://localhost:4200', 'http://localhost:3000']
  });

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
