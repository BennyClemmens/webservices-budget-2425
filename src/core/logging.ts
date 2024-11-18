// src/core/logging.ts
import winston from 'winston'; // 👈 importing the winston package
import config from "config"; // B
//import { env } from "node:process";  // A

//const NODE_ENV = env['NODE_ENV']; // op te vragen dakzij inmport A, later onnodig
const NODE_ENV = config.get<string>('node_env');
const LOG_LEVEL = config.get<string>('log.level'); // dankzij B, met opgegeven type (generics)
const LOG_DISABLED = config.get<boolean>('log.disabled');

console.log({NODE_ENV, LOG_LEVEL, LOG_DISABLED});


// 👇 initialising a root logger with silly log level and simple formatting
const rootLogger: winston.Logger = winston.createLogger({
  level: LOG_LEVEL,
  format: winston.format.simple(),
  transports: [new winston.transports.Console({silent: LOG_DISABLED})], // only logging to the console for now
  // later perhaps: file, database, cloud service, etc.
});

// here everything is set in one logger, but multible for different parts would be possible

// 👇 exporting the function getLogger which is returning the root logger (a singleton pattern)
export const getLogger = () => {
  return rootLogger;
};
