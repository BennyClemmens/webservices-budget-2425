// src/core/logging.ts
import winston from 'winston'; // 👈 importing the winston package

// 👇 initialising a root logger with silly log level and simple formatting
const rootLogger: winston.Logger = winston.createLogger({
  level: 'silly',
  format: winston.format.simple(),
  transports: [new winston.transports.Console()], // only logging to the console for now
  // later perhaps: file, database, cloud service, etc.
});

// here everything is set in one logger, but multible for different parts would be possible

// 👇 exporting the function getLogger which is returning the root logger (a singleton pattern)
export const getLogger = () => {
  return rootLogger;
};
