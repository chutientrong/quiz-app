import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class AppService {
  @MessagePattern('get_user')
  getUser(data: any) {
    // Logic to retrieve a user
    return { id: data.id, name: 'John Doe' }; // Sample response
  }
}
