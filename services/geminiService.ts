import { GoogleGenAI } from "@google/genai";
import { ImageGenerationParams, GenerationResult } from "../types";

// Helper to handle the specific API key requirement for Gemini 3 Pro
export const ensureApiKey = async (): Promise<boolean> => {
  if (window.aistudio && window.aistudio.hasSelectedApiKey) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      // If we don't have a key, we return false so the UI can prompt the user
      return false;
    }
    return true;
  }
  // Fallback for environments without the specific wrapper, though typically required for this challenge
  return !!process.env.API_KEY;
};

export const promptForApiKey = async (): Promise<void> => {
  if (window.aistudio && window.aistudio.openSelectKey) {
    await window.aistudio.openSelectKey();
  }
};

export const generateCreativeImage = async (params: ImageGenerationParams): Promise<GenerationResult> => {
  try {
    // Always instantiate fresh to ensure we pick up the latest env key if it changed via selection
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using gemini-3-pro-image-preview as requested (Nano Banana Pro mapping)
    const model = 'gemini-3-pro-image-preview';

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            text: params.prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          imageSize: params.size,
          aspectRatio: params.aspectRatio,
        },
      },
    });

    // Parse response
    if (response.candidates && response.candidates.length > 0) {
      const parts = response.candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const base64Data = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || 'image/png';
          return {
            imageUrl: `data:${mimeType};base64,${base64Data}`,
            error: null,
          };
        }
      }
    }

    return {
      imageUrl: null,
      error: "No image data found in response.",
    };

  } catch (err: any) {
    console.error("Image generation error:", err);
    let errorMessage = "An unknown error occurred.";
    if (err instanceof Error) {
      errorMessage = err.message;
      if (errorMessage.includes("Requested entity was not found") || errorMessage.includes("404")) {
          // This specific error often indicates API Key issues in this environment
          errorMessage = "API Key error. Please re-select your key.";
      }
    }
    return {
      imageUrl: null,
      error: errorMessage,
    };
  }
};
