"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const config_1 = require("./config");
exports.logger = (0, pino_1.default)({
    level: config_1.config.LOG_LEVEL,
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            timestamp: true,
            levels: config_1.config.LOG_LEVEL,
            options: {
                ignore: "pid,hostname",
                colorize: true,
                translateTime: true,
            },
        },
    },
});
