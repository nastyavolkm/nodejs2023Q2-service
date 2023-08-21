import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

const LOGGING_LEVELS = { error: 0, warn: 1, log: 2, verbose: 3, debug: 4 };

@Injectable()
export class LoggingService extends ConsoleLogger {
  private logLevel = process.env.LOGGING_LEVEL || 5;
  constructor() {
    super();
  }
  public logResponse(req: Request, res: Response) {
    if (LOGGING_LEVELS.log <= this.logLevel) {
      const { method, body, originalUrl, query, headers } = req;
      const message = `method: ${method} url: ${originalUrl} headers: ${JSON.stringify(
        headers,
      )} body: ${JSON.stringify(body)}  queryParams: ${JSON.stringify(
        query,
      )} statusCode: ${res.statusCode} message: ${res.statusMessage}`;
      this.log(message);
    }
  }

  public error(message: string, trace?: string) {
    if (LOGGING_LEVELS.error <= this.logLevel) {
      super.error(message, trace);
    }
  }
}
