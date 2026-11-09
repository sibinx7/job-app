import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { SwaggerModule } from "@nestjs/swagger";
import swaggerConfig from "./config/swagger.config.js";
import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';
import process from 'node:process';

const numCPUs = availableParallelism ? availableParallelism() : 1;

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

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} Application is running on: http://localhost:${process.env.PORT ?? 3000}. Number of CPUs ${numCPUs}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died.`)
    cluster?.fork();
  })
} else {
    await bootstrap();
}

