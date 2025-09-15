import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AdminController } from './admin/admin.controller';
import * as Joi from 'joi';
import { RolesGuard } from './roles/roles.guard';
import { CatsService } from './cats/cats.service';
import { CatsController } from './cats/cats.controller';
import { MathService } from './math/math.service';
import { LoggingInterceptor } from './common/interceptors/logging/logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true, // available everywhere
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // dynamic env
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    
    // Then configure TypeORM with env vars
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        database: config.get<string>('DB_NAME', 'focusbear'),
        username: config.get<string>('DB_USER', 'user'),
        password: config.get<string>('DB_PASSWORD', 'password'),
        entities: ['dist/**/*.entity.js'],
        synchronize: true,
      }),
    }),

    LoggerModule.forRoot({
        pinoHttp: {
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              singleLine: true,
            },
          },
        },
    }),

    UsersModule],
  controllers: [AppController, AdminController, CatsController],
  providers: [AppService, RolesGuard, CatsService, MathService, LoggingInterceptor],
})
export class AppModule {}
