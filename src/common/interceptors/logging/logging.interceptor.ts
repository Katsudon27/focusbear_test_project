import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger as NestLogger, Inject } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Logger } from 'nestjs-pino';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(@Inject(Logger) private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;

    return next.handle().pipe(
      tap((data) => {
        this.logger.log(`${method} ${url} -> ${JSON.stringify(data)}`);
      }),
    );
  }
}
