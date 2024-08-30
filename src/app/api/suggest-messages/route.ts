/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {text: "Create a list of three open-ended and engaging questions formatted as a single string.\n      Each question should be separated by '||'. These questions are for an anonymous social messaging platform, \n      like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, \n      focusing instead on universal themes that encourage friendly interaction. For example, your output \n      should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with \n      any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions \n      are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "What's a skill you're currently trying to learn or improve? || What's the most interesting thing you've learned recently? || If you could have any superpower for a day, what would it be and why? \n"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
}

run();