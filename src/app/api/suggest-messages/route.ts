"""
Install the Google AI Python SDK

$ pip install google-generativeai
"""

import os
import google.generativeai as genai

genai.configure(api_key=os.environ["process.env.NEXT_PUBLIC_GEMINI_API_KEY"])

# Create the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
  # safety_settings = Adjust safety settings
  # See https://ai.google.dev/gemini-api/docs/safety-settings
)

chat_session = model.start_chat(
  history=[
    {
      "role": "user",
      "parts": [
        "Create a list of three open-ended and engaging questions formatted as a single string.\n      Each question should be separated by '||'. These questions are for an anonymous social messaging platform, \n      like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, \n      focusing instead on universal themes that encourage friendly interaction. For example, your output \n      should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with \n      any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions \n      are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.\n",
      ],
    },
    {
      "role": "model",
      "parts": [
        "What's a skill you're currently trying to learn or improve? || What's the most interesting thing you've learned recently? || If you could have any superpower for a day, what would it be and why? \n",
      ],
    },
  ]
)

response = chat_session.send_message("INSERT_INPUT_HERE")

print(response.text)