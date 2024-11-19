// src/core/logging.ts
import winston from 'winston'; // 👈 importing the winston package
import config from 'config'; // B
//import { env } from "node:process";  // A
const { combine, timestamp, colorize, printf } = winston.format; // destructuring

//const NODE_ENV = env['NODE_ENV']; // op te vragen dakzij inmport A, later onnodig
const NODE_ENV = config.get<string>('node_env');
const LOG_LEVEL = config.get<string>('log.level'); // dankzij B, met opgegeven type (generics)
const LOG_DISABLED = config.get<boolean>('log.disabled');

//console.log({NODE_ENV, LOG_LEVEL, LOG_DISABLED});

// we maken een functie die het formaat definieert, welke we dan gaan meegeven aan winston (als string)
const loggerFormat = () => {
  const formatMessage = ({
    level,
    message,
    timestamp,
    ...rest
  }: winston.Logform.TransformableInfo) => {
    return `${timestamp} | ${level} | ${message} | ${JSON.stringify(rest)}`;
  };

  const formatError = ({
    error: { stack },
    ...rest
  }: winston.Logform.TransformableInfo) =>
    `${formatMessage(rest)}\n\n${stack}\n`;

  const format = (info: winston.Logform.TransformableInfo) => {
    if (info?.['error'] instanceof Error) { // ?. want we zijn niet zeker of er info is
      return formatError(info);
    } // om dat error niet serialisable is, iets speciaals nodig, zie hoger

    return formatMessage(info); // , zie hoger
  };

  return combine(colorize(), timestamp(), printf(format));
  // een combinatie van stukjes formatering
  // todo: in JSON format ... (see best practices and amazon cloudwatch?)
};

// 👇 initialising a root logger with silly log level and simple formatting
const rootLogger: winston.Logger = winston.createLogger({
  level: LOG_LEVEL,
  format: loggerFormat(),
  defaultMeta: {
    default_meta_env: NODE_ENV,
  },
  transports:
    NODE_ENV === 'testing'
      ? [new winston.transports.File({
        filename: 'log/testing.log',
        silent: LOG_DISABLED,
      })]
      : [new winston.transports.Console({silent: LOG_DISABLED})],
  // later perhaps: file, database, cloud service, etc.
});

// here everything is set in one logger, but multible for different parts would be possible

// 👇 exporting the function getLogger which is returning the root logger (a singleton pattern)
export const getLogger = () => {
  return rootLogger;
};
