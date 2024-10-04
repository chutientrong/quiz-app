import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost', // Replace with your host if needed
      port: 3002, // Port for User Service
    },
  });

  await app.listen(); // Start the microservice
}
bootstrap();
