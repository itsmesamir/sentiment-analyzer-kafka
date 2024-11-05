"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInput = createInput;
function createInput(promptGenerator) {
    return {
        modelId: process.env.LLM_MODEL_ID,
        contentType: "application/json",
        accept: "application/json",
        cliBinaryFormat: "raw-in-base64-out",
        body: {
            prompt: promptGenerator,
            temperature: 0,
            top_p: 1,
            max_tokens: 4000,
        },
    };
}
