import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging/logging.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private loggingService: LoggingService) {}
  use(req: Request, res: Response, next: NextFunction) {
    this.loggingService.logRequest(req);
    res.on('close', () => {
      this.loggingService.logResponse(res);
    });
    next();
  }
}
