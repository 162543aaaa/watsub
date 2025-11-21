import { GoogleGenAI, Type } from "@google/genai";
import { AIProjectProposal, Priority, TaskCategory } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateProjectPlan = async (userPrompt: string): Promise<AIProjectProposal> => {
  const ai = getClient();
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Act as a senior project manager. Create a structured project plan based on this request: "${userPrompt}". 
    Determine if this is strictly an internal project or external client work.
    Break it down into actionable tasks with priorities, suggested assignees (by role), and estimated duration in days.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "A short, catchy name for the project" },
          description: { type: Type.STRING, description: "A brief executive summary" },
          category: { type: Type.STRING, enum: [TaskCategory.INTERNAL, TaskCategory.EXTERNAL] },
          tasks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                priority: { type: Type.STRING, enum: [Priority.LOW, Priority.MEDIUM, Priority.HIGH] },
                assignee: { type: Type.STRING, description: "Job role e.g. Designer, Developer" },
                estimatedDays: { type: Type.INTEGER, description: "Estimated days to complete" }
              },
              required: ["title", "priority", "assignee"]
            }
          }
        },
        required: ["name", "description", "tasks", "category"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text) as AIProjectProposal;
};

export const suggestTaskBreakdown = async (taskTitle: string): Promise<{ subtasks: string[] }> => {
  const ai = getClient();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Break down the task "${taskTitle}" into 3-5 smaller sub-steps or checklist items.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          subtasks: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      }
    }
  });

  const text = response.text;
  if (!text) return { subtasks: [] };
  return JSON.parse(text);
}