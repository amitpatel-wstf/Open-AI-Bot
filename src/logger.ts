import pino, { levels } from "pino";
import { config } from "./config";

export const logger = pino({
  level: config.LOG_LEVEL,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      timestamp: true,
      levels: config.LOG_LEVEL,
      options: {
        ignore: "pid,hostname",
        colorize: true,
        translateTime: true,
      },
    },
  },
});

export type Logger = typeof logger;
