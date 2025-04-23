const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_);



// async function embedTexts(texts) {
//     const embeddingModel = genAI.getGenerativeModel({
//         model: 'models/text-embedding-004', // 768 dimensions
//     });
//     const result = await embeddingModel.embedContent({
//         content: {
//             parts: [{ text: texts }], // Required structure
//         },
//     });
//     return result.embedding.values;
// };


// async function embedTexts(texts) {
//     const embeddingModel = genAI.getGenerativeModel({
//       model: 'models/text-embedding-004',
//     });
  
//     try {
//       const result = await embeddingModel.embedContent({
//         content: Array.isArray(texts) ? texts.join(' ') : texts, // Flatten if array
//       });
//       return result.embedding.values;
//     } catch (error) {
//       console.error("❌ Gemini embed error:", error);
//       throw new Error("Gemini embedding failed: " + error.message);
//     }
//   }


async function embedTexts(texts) {
    const res = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:batchEmbedContents',
        {
            requests: texts.map(text => ({
                model: "models/text-embedding-004",
                content: {
                    parts: [{ text }]
                }
            }))
        },
        {
            params: { key: process.env.GEMINI_API_KEY_ },
            headers: { 'Content-Type': 'application/json' },
        }
    );
    return res.data.embeddings.map(e => e.values);
}

  
async function chatWithContext(context, query) {
    const systemPrompt = `You are a helpful assistant. Answer the question based on the context provided. Context: ${context}`;
    
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: systemPrompt,
    });
  
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: query }],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json"
      },
    });
  
    const response = await result.response;
    const text = await response.text(); 
return text;
  }
  
module.exports = { embedTexts, chatWithContext };

