import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging/logging.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new LoggingService();
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.logRequest(req);
    res.on('close', () => {
      this.logger.logResponse(res);
    });
    next();
  }
}
