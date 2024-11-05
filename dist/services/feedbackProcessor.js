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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processFeedback = void 0;
const bedrockClient_1 = require("./bedrockClient");
const fs_1 = __importDefault(require("fs"));
const processFeedback = (feedback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const analysisResult = yield (0, bedrockClient_1.analyzeFeedback)(feedback);
        const summary = {
            feedback,
            analysis: analysisResult,
        };
        fs_1.default.appendFileSync("feedback_summary.json", JSON.stringify(summary) + "\n");
        console.log("Feedback summarized:", summary);
    }
    catch (error) {
        console.error("Error processing feedback:", error);
    }
});
exports.processFeedback = processFeedback;
