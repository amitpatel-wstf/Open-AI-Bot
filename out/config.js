"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
const zod_1 = __importDefault(require("zod"));
const znv_1 = require("znv");
const createConfigFromEnvironment = (env) => {
    const config = (0, znv_1.parseEnv)(env, {
        // PORT
        PORT: (0, znv_1.port)().default(3001),
        // API_KEY
        API_KEY: zod_1.default.string(),
        // BOT_TOKEN
        BOT_TOKEN: zod_1.default.string(),
        // BOT_USERNAME
        BOT_USERNAME: zod_1.default.string(),
        // AI URL
        URL: zod_1.default.string(),
        // MODEL_NAME
        MODEL_NAME: zod_1.default.string(),
        //Role
        ROLE: zod_1.default.string(),
        // LOG level
        LOG_LEVEL: zod_1.default
            .enum(["trace", "debug", "info", "warn", "error", "fatal", "silent"])
            .default("info"),
    });
    return Object.assign({}, config);
};
exports.config = createConfigFromEnvironment(process.env);
