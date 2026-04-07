import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("ERROR: GEMINI_API_KEY is not defined in .env");
    return;
  }

  console.log("Starting Diagnostic for Key:", apiKey.substring(0, 8) + "...");
  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    console.log("Testing Model: gemini-1.5-flash with v1 endpoint...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: 'v1' });
    const result = await model.generateContent("Say 'TEST OK' if you hear me.");
    const response = await result.response;
    console.log("SUCCESS! Response:", response.text());
  } catch (err: any) {
    console.log("FAILED on gemini-1.5-flash.");
    console.log("CAUGHT ERROR:", err.message);
    
    if (err.message.includes("404")) {
      console.log("Diagnostic: Trying backup model gemini-pro...");
      try {
        const modelBackup = genAI.getGenerativeModel({ model: "gemini-pro" });
        const resultBackup = await modelBackup.generateContent("Say 'BACKUP OK' if you hear me.");
        const responseBackup = await resultBackup.response;
        console.log("BACKUP SUCCESS! Response:", responseBackup.text());
        console.log("CONCLUSION: Your key is restricted to older models. Switching to gemini-pro will fix it.");
      } catch (err2: any) {
        console.log("BACKUP FAILED TOO:", err2.message);
      }
    }
  }
}

testGemini();
