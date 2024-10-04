import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configure TCP Microservice
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost', // Replace with your host if needed
      port: 3000, // Choose an appropriate port for the API Gateway
    },
  });

  await app.startAllMicroservicesAsync(); // Start the microservices
  await app.listen(3001); // Main application port
}
bootstrap();
