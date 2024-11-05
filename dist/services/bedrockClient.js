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
exports.analyzeFeedback = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const prompts_1 = require("../utils/prompts");
const bedrock = new aws_sdk_1.default.BedrockRuntime({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const analyzeFeedback = (feedback) => __awaiter(void 0, void 0, void 0, function* () {
    const modelId = process.env.LLM_MODEL_ID;
    if (!modelId) {
        throw new Error("LLM_MODEL_ID is not defined");
    }
    const params = {
        modelId,
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
            temperature: 0,
            top_p: 1,
            max_tokens: 20000,
            prompt: (0, prompts_1.feedbackSummarizer)(feedback),
        }),
    };
    const response = yield bedrock.invokeModel(params).promise();
    console.log("Response from bedrock:", response);
    return JSON.parse(response.body);
});
exports.analyzeFeedback = analyzeFeedback;
