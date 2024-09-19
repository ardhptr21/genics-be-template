import { createLogger, format, transports, type LoggerOptions } from 'winston';
import { env } from '../configs/env';

type Loggers = {
  [key: string]: LoggerOptions;
};

const formatProduction = format.combine(format.uncolorize(), format.timestamp(), format.json());
const formatDevelopment = format.combine(
  format.colorize(),
  format.timestamp({ format: () => new Date().toLocaleString() }),
  format.printf(({ level, message, timestamp, stack }) => {
    return `[${timestamp}] ${level}: ${message}${stack ? `\n${stack}` : ''}`;
  })
);

const loggers: Loggers = {
  development: {
    transports: [new transports.Console()],
    format: formatDevelopment
  },
  production: {
    transports: [
      new transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: formatProduction
      }),
      new transports.File({
        filename: 'logs/combined.log',
        level: env.DEBUG_LEVEL,
        format: formatProduction
      })
    ]
  }
};

export const logger = createLogger(loggers[env.NODE_ENV] ?? loggers.development);
