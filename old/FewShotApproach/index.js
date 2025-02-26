import { Configuration, OpenAIApi } from "openai";
import { process } from './env';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

document.getElementById("submit-btn").addEventListener("click", () => {
  const productName = document.getElementById("name").value;
  const productDesc = document.getElementById("desc").value;
  const productTarget = document.getElementById("target").value;
  getCopySuggestion(productName, productDesc, productTarget);
})


async function getCopySuggestion(productName, productDesc, productTarget) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Create 50 words of advertising copy for ${productName}, which can be described as ${productDesc} aimed at ${productTarget}.
    `,
    max_tokens: 100,
  });
  document.getElementById('ad-output').insertAdjacentText('beforeend', response.data.choices[0].text.trim())
  document.getElementById('ad-input').style.display = 'none'
  document.getElementById('ad-output').style.display = 'block'
}