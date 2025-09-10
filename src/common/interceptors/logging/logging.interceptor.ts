import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    console.log(`[Interceptor] Incoming request: ${req.method} ${req.url}`);

    return next.handle().pipe(
      tap(() => console.log(`[Interceptor] Response in... ${Date.now() - now}ms`)),
    );
  }
}
