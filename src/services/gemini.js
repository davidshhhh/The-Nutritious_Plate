import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize the Gemini API
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

if (!API_KEY) {
  console.error('⚠️ Gemini API key is missing! Please add VITE_GEMINI_API_KEY to your .env file')
}

const genAI = new GoogleGenerativeAI(API_KEY)

// System instruction configuration for Gemini
const SYSTEM_INSTRUCTION = {
  role: "You are Ash, a sophisticated, adaptive wellness collaborator for 'The Nutritious Plate.'",
  
  personality: {
    tone: "Authentic and supportive with a touch of dry wit",
    philosophy: "Balance empathy with candor. Validate feelings but correct misinformation gently and directly",
    style: "Adaptive. Match the user's energy. If they are brief, you are brief"
  },
  
  rules: [
    "No Fluff: Never start with 'As an AI...' or 'I understand...' Skip the generic intros and get straight to the value",
    "Formatting: Write naturally like a conversation. Only use bold or headers if truly needed for clarity. Default to plain text",
    "Verbosity: Keep responses under 150 words unless the user asks for a deep dive",
    "No Repetition: Do not repeat the user's question back to them",
    "No Gimmicks: Answer directly. Don't turn introductions into recipes or metaphors unless explicitly asked"
  ]
}

// Convert system instruction to the official SDK format
const getSystemPrompt = () => {
  const text = `${SYSTEM_INSTRUCTION.role}

PERSONALITY:
- Tone: ${SYSTEM_INSTRUCTION.personality.tone}
- Philosophy: ${SYSTEM_INSTRUCTION.personality.philosophy}
- Style: ${SYSTEM_INSTRUCTION.personality.style}

STRICT RULES:
${SYSTEM_INSTRUCTION.rules.map((rule, i) => `${i + 1}. ${rule}`).join('\n')}

RESPONSE FORMAT:
You must respond in JSON format:
{
  "message": "Your conversational response (Ash's voice)",
  "recipe": { 
    "vision": "string",
    "ingredientsList": ["string", "string", ...],
    "ingredients": [], 
    "steps": [] 
  } 
}

CRITICAL - Ingredients List for Nutrition:
The "ingredientsList" array is used to query a medical-grade USDA nutrition database and calculate the TOTAL nutrition for the entire meal.

Formatting Rules:
- Format each ingredient for optimal USDA searching with quantity
- Examples: ["1 large egg", "1/2 avocado", "1 slice sprouted grain bread", "6 oz chicken breast boneless skinless"]
- Be SPECIFIC with food types (e.g., "greek yogurt plain" not just "yogurt", "chicken breast raw" not just "chicken")
- Include quantities in standard measurements (oz, cups, tbsp, tsp, slices, large/medium/small)
- EXCLUDE minor spices, seasonings, and water (keeps API calls efficient)
- Only list ingredients that contribute meaningful calories/macros

Efficiency:
- Only include the 'recipe' object if the user explicitly asks to fix/mend food.
- Focus on the 5-10 main ingredients that contribute to nutrition.
- The "ingredients" array can be more detailed with preparation notes for display.`;

  // The SDK requires this specific structure:
  return {
    parts: [{ text: text }]
  };
}

// Get the Gemini model with fixed System Instructions
export const getGeminiModel = (modelName = 'gemini-3-flash-preview') => {
  return genAI.getGenerativeModel({ 
    model: modelName,
    systemInstruction: getSystemPrompt() // Now returns the correct object
  });
}

// Generate recipe from text prompt
export const generateRecipe = async (prompt) => {
  try {
    const model = getGeminiModel()
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    return {
      success: true,
      data: text
    }
  } catch (error) {
    console.error('Error generating recipe:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Generate recipe with streaming response
export const generateRecipeStream = async (prompt, onChunk) => {
  try {
    const model = getGeminiModel()
    const result = await model.generateContentStream(prompt)
    
    let fullText = ''
    for await (const chunk of result.stream) {
      const chunkText = chunk.text()
      fullText += chunkText
      if (onChunk) {
        onChunk(chunkText, fullText)
      }
    }
    
    return {
      success: true,
      data: fullText
    }
  } catch (error) {
    console.error('Error generating recipe stream:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Generate content with custom configuration
export const generateWithConfig = async (prompt, config = {}) => {
  try {
    const modelName = config.model || 'gemini-3-flash-preview'
    const model = genAI.getGenerativeModel({ 
      model: modelName,
      systemInstruction: getSystemPrompt()
    })
    
    const generationConfig = {
      temperature: config.temperature || 0.7,
      topK: config.topK || 40,
      topP: config.topP || 0.95,
      maxOutputTokens: config.maxOutputTokens || 1024,
    }
    
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig,
    })
    
    const response = await result.response
    const text = response.text()
    
    return {
      success: true,
      data: text
    }
  } catch (error) {
    console.error('Error generating content:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Update createChatSession to force JSON mode
export const createChatSession = (history = []) => {
  const model = getGeminiModel();
  return model.startChat({
    history: history,
    generationConfig: {
      responseMimeType: "application/json", // This ensures Ash always sends JSON
      temperature: 0.8,
      maxOutputTokens: 1024,
    },
  });
}

export default {
  getGeminiModel,
  generateRecipe,
  generateRecipeStream,
  generateWithConfig,
  createChatSession,
  SYSTEM_INSTRUCTION,
  getSystemPrompt
}
