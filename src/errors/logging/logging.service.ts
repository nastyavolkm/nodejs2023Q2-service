import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggingService extends ConsoleLogger {
  public logRequest(req: Request) {
    this.log(`request:`, {
      method: req.method,
      body: req.body,
      originalUrl: req.originalUrl,
      queryParams: req.query,
    });
  }

  public logResponse(res: Response) {
    this.log(`response:`, {
      statusCode: res.statusCode,
      message: res.statusMessage,
    });
  }
}
