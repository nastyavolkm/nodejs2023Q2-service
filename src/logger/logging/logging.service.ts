import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  statSync,
  mkdirSync,
  renameSync,
  existsSync,
  appendFileSync,
} from 'node:fs';
import { join } from 'node:path';

const BYTES_IN_KILO_BITES = 1024;
const LOGGING_LEVELS = { error: 0, warn: 1, log: 2, verbose: 3, debug: 4 };

@Injectable()
export class LoggingService extends ConsoleLogger {
  private logLevel = process.env.LOGGING_LEVEL || 5;
  constructor() {
    super();
  }
  public logResponse(req: Request, res: Response) {
    if (LOGGING_LEVELS.log >= this.logLevel) {
      const { method, body, originalUrl, query } = req;
      const message = `method: ${method} url: ${originalUrl} body: ${JSON.stringify(
        body,
      )}  queryParams: ${JSON.stringify(query)} statusCode: ${
        res.statusCode
      } message: ${res.statusMessage}`;
      this.log(message);
      LoggingService.writeToFile(message, 'log');
    }
  }

  public error(message: string, trace?: string) {
    if (LOGGING_LEVELS.error >= this.logLevel) {
      super.error(message, trace);
      LoggingService.writeToFile(message, 'error');
    }
  }

  private static async writeToFile(message, logType: 'error' | 'log' | 'warn') {
    const dirName = join('.', 'src', 'logger', 'logs');
    const logFilePath = join(dirName, `${logType}.log`);
    const logMessage = `${new Date().toISOString()} - ${message}\n`;
    mkdirSync(dirName, { recursive: true });

    if (existsSync(logFilePath)) {
      const stats = statSync(logFilePath);
      const fileSizeInBytes = stats.size;

      const fileSize = fileSizeInBytes / BYTES_IN_KILO_BITES;
      const maxLogFileSize = process.env.MAX_LOG_FILE_SIZE || 10;

      if (fileSize > maxLogFileSize) {
        const oldFilePath = join(
          dirName,
          `${new Date().toISOString()}-${logFilePath}`,
        );
        renameSync(logFilePath, oldFilePath);
      }
    }
    appendFileSync(logFilePath, logMessage);
  }
}
