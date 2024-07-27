// import { GoogleGenerativeAI } from "@google/generative-ai";
// // import { GoogleGenerativeAI } from "../generative-ai";

// const apiKey = "AIzaSyAqmHXxNVZ3CAirQqa7ep0zfdW9vQZC1II";
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// async function runChat(prompt) {
//   try {
//     const chatSession = model.startChat({
//       generationConfig,
//       history: [],
//     });

//     const result = await chatSession.sendMessage(prompt);
//     const response = result.response;
//     console.log(response.text());
//     return response.text(); // Return the response text
//   } catch (error) {
//     console.error("Error in runChat:", error);
//     throw error;
//   }
// }

// export default runChat;



import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyAqmHXxNVZ3CAirQqa7ep0zfdW9vQZC1II";
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

async function runChat(prompt) {
  try {
    const chatSession = await model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    const response = result.response;
    console.log(response); // Log the response for debugging
    return response.text(); // Ensure this returns a string
  } catch (error) {
    console.error("Error in runChat:", error);
    throw error;
  }
}

export default runChat;
