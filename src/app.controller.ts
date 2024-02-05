import { Controller, Get } from '@nestjs/common';

@Controller('/api')
export class AppController {
  constructor() {}

  @Get('/healthcheck')
  healthcheck(): string {
    return 'OK';
  }
}
