"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponse = getResponse;
const config_1 = require("../config");
function getResponse(message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(config_1.config.URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.API_KEY}`,
                },
                body: JSON.stringify({
                    model: config_1.config.MODEL_NAME,
                    messages: [{ role: config_1.config.ROLE, content: message }],
                }),
            });
            const result = yield response.json();
            return result.choices[0].message.content;
        }
        catch (error) {
            console.error("Error fetching response from AI model:", error);
            return "Failed to fetch response from AI model";
        }
    });
}
