import { Controller, Get, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private configService: ConfigService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ping')
  getPing() {
    return { message: 'pong' };
  }

  @Get('ok')
  getOk() {
    return { success: true, message: 'All good!' };
  }

  @Get('error')
  getError() {
    throw new HttpException('Custom error occurred', HttpStatus.BAD_REQUEST);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('config-test')
  getConfig() {
    return {
      dbHost: this.configService.get<string>('DB_HOST'),
      dbName: this.configService.get<string>('DB_NAME'),
      env: process.env.NODE_ENV || 'development',
    };
  }
}
