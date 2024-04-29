import path from 'path';
import winston, { Logger as WinstonLogger } from 'winston';
const { combine, timestamp, printf, colorize, align, json } = winston.format;

const errorFilter = winston.format((info, opts) => {
  return info.level === 'error' ? info : false;
});

const infoFilter = winston.format((info, opts) => {
  return info.level === 'info' ? info : false;
});

export class Logger {
  private static instance: Logger;
  private winstonLogger: WinstonLogger;

  private constructor() {
    this.winstonLogger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: combine(timestamp(), json()),
      transports: [
        new winston.transports.File({
          filename: path.join(__dirname, '../', '../', 'logs', 'app-error.log'),
          level: 'error',
          format: combine(errorFilter(), timestamp(), json()),
        }),
        new winston.transports.File({
          filename: path.join(__dirname, '../', '../', 'logs', 'app-info.log'),
          level: 'info',
          format: combine(infoFilter(), timestamp(), json()),
        }),
      ],
      defaultMeta: {
        // owner: 'ankit-sharma',
      },
    });
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public info(message: string): void {
    this.winstonLogger.info(message);
  }

  public warn(message: string): void {
    this.winstonLogger.warn(message);
  }

  public error(message: string): void {
    this.winstonLogger.error(message);
  }
}

export default Logger;
