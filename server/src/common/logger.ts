import fs from 'fs';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { LOG_DIR, __prod__ } from '../config/config';

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

const logLevel = __prod__ ? 'warn' : 'debug';

const options = {
  file: {
    level: logLevel,
    filename: LOG_DIR + '/%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    json: true,
    maxSize: '20m',
    colorize: true,
    maxFiles: '14d',
  } as DailyRotateFile.DailyRotateFileTransportOptions,
};

export default createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: format.combine(
        format.errors({ stack: true }),
        format.prettyPrint()
      ),
    }),
  ],
  exceptionHandlers: [new DailyRotateFile(options.file)],
  exitOnError: false, // do not exit on handled exceptions
});
