import { customProvider } from 'ai';
import { openai } from '@ai-sdk/openai';
import { extractReasoningMiddleware, wrapLanguageModel } from 'ai';

export const myProvider = customProvider({
  languageModels: {
    'chat-model': openai('gpt-4.1-2025-04-14', {
      structuredOutputs: false,
    }),
    'chat-model-reasoning': wrapLanguageModel({
      model: openai('o3-2025-04-16', {
        structuredOutputs: true,
      }),
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    }),
    'title-model': openai('gpt-4.1-mini-2025-04-14'),
    'artifact-model': openai('gpt-4.1-mini-2025-04-14'),
  },
  // optionally add imageModels if you need vision support
  // imageModels: { 'small-model': openai.imageModel('gpt-4.1-2025-04-14') },
  fallbackProvider: openai,
});