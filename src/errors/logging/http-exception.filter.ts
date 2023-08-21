import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private loggingService: LoggingService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorMessage = exception.message;

    this.loggingService.error(errorMessage, exception.stack);

    response.status(status).json({
      statusCode: status,
      errorMessage,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
