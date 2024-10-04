import { Controller, Get, Query } from '@nestjs/common';
import { ClientProxy, MessagePattern, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Controller('users')
export class AppController {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost', // Ensure this matches your user service host
        port: 3002, // Port for User Service
      },
    });
  }

  @Get()
  getUser(@Query('id') id: string) {
    return this.client.send({ cmd: 'get_user' }, { id });
  }
}
