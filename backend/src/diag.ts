import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

async function run() {
  const result: { success: boolean; error: string; models: string[] } = { success: false, error: "", models: [] };
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const res = await model.generateContent("test");
    result.success = true;

    result.models.push("gemini-2.5-flash-lite");
  } catch (e: any) {
    result.error = e.message;
  }
  fs.writeFileSync("diag_result.json", JSON.stringify(result, null, 2));
}
run();
