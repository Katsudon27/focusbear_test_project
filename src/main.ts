import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(Logger));

  // Register global error filter
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors();
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Register the LoggingInterceptor globally
  app.useGlobalInterceptors(app.get(LoggingInterceptor));
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
