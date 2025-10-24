import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔹 Configurar rutas absolutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 Servir archivos estáticos desde "public"
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// 🔹 Ruta principal
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// 🔹 Configurar conexión a OpenAI solo para el chatbot
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🔹 Ruta del chatbot (único uso de IA)
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // modelo rápido y económico
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("❌ Error con OpenAI:", error.message);
    res.status(500).json({ error: "Error con OpenAI" });
  }
});

// 🔹 Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor activo en http://localhost:${PORT}`);
  console.log(`📂 Sirviendo archivos desde: ${publicPath}`);
});
