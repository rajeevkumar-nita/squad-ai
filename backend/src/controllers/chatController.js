// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const { loadSquadData } = require("../utils/dataLoader");
// require('dotenv').config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// // Load Data
// let SQUAD_CONTEXT = loadSquadData();

// const chatWithSquad = async (req, res) => {
//     try {
//         const { message } = req.body;
        
//         // Reload data strictly for dev (remove in prod for speed)
//         // SQUAD_CONTEXT = loadSquadData(); 

//         const systemPrompt = `
//         You are a chatbot for a group of 7 friends. 
//         Context Data:
//         ${SQUAD_CONTEXT}

//         User: ${message}
        
//         Instructions:
//         - If the question is professional, answer formally based on their role.
//         - If the question is casual, answer in Hinglish, be funny, and roast them using the data provided.
//         - Keep answers short.
//         `;

//         const result = await model.generateContent(systemPrompt);
//         const response = await result.response;
//         const text = response.text();

//         res.json({ reply: text });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Server Error" });
//     }
// };

// module.exports = { chatWithSquad };





const axios = require('axios');
const { loadSquadData } = require("../utils/dataLoader");
require('dotenv').config();

// Load Data
let SQUAD_CONTEXT = loadSquadData();

const chatWithSquad = async (req, res) => {
    try {
        const { message } = req.body;
        const API_KEY = process.env.GEMINI_API_KEY;
        
        // Yahan hum wahi model use karenge jo sabse reliable hai.
        // Aapne 'gemini-2.5-flash' likha tha, wo shayad typo tha.
        // Current fastest aur stable model "gemini-1.5-flash" hai.
        const MODEL_NAME = "gemini-2.5-flash";
        
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

        const systemPrompt = `
        You are a chatbot for a group of 7 friends. 
        Context Data:
        ${SQUAD_CONTEXT}

        User: ${message}
        
        Instructions:
        - If the question is professional, answer formally based on their role.
        - If the question is casual, answer in Hinglish, be funny, and roast them using the data provided.
        - Keep answers short.
        `;

        // Direct API Call (Jaisa aapka purana wala code tha)
        const response = await axios.post(url, {
            contents: [{
                parts: [{ text: systemPrompt }]
            }]
        });

        // Response structure thoda alag hota hai direct API me
        const text = response.data.candidates[0].content.parts[0].text;

        res.json({ reply: text });

    } catch (error) {
        console.error("Gemini API Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Server Error: API call fail ho gayi." });
    }
};

module.exports = { chatWithSquad };