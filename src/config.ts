import "dotenv/config";
import z from "zod";
import { parseEnv, port } from "znv";

const createConfigFromEnvironment = (env: NodeJS.ProcessEnv) => {
  const config = parseEnv(env, {
    // PORT
    PORT: port().default(3001),
    // API_KEY
    API_KEY: z.string(),
    // BOT_TOKEN
    BOT_TOKEN: z.string(),
    // BOT_USERNAME
    BOT_USERNAME: z.string(),
    // AI URL
    URL: z.string(),
    // MODEL_NAME
    MODEL_NAME: z.string(),
    //Role
    ROLE: z.string(),
    // LOG level
    LOG_LEVEL: z
    .enum(["trace", "debug", "info", "warn", "error", "fatal", "silent"])
    .default("info"),
  });

  return {
    ...config,
  };
};

export const config = createConfigFromEnvironment(process.env);
