const apiKey = "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";

const url = "https://api.openai.com/v1/completions";

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: "text-davinci-003",
    prompt: "How to use ChatGPT for React Native?",
  }),
}).then((response) => response.json()).then((data) => console.log(data));

/**
node index.js
{
  warning: 'This model version is deprecated. Migrate before January 4, 2024 to avoid disruption of service. Learn more https://platform.openai.com/docs/deprecations',
  id: 'cmpl-7j2WCxRecGVIvO9pzQqMJPNS1EJH8',
  object: 'text_completion',
  created: 1690968796,
  model: 'text-davinci-003',
  choices: [
    {
      text: '\n' +
        '\n' +
        '1. Make sure you have the latest version of React Native installed on',
      index: 0,
      logprobs: null,
      finish_reason: 'length'
    }
  ],
  usage: { prompt_tokens: 10, completion_tokens: 16, total_tokens: 26 }
}
   */
