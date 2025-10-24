// -------------------------------
// 🔹 Importaciones y configuración
// -------------------------------
import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// Cargar variables de entorno desde .env
dotenv.config();

// Verificar que exista la API key (para evitar errores silenciosos)
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ ERROR: No se encontró la variable OPENAI_API_KEY en el archivo .env");
  process.exit(1); // Detiene el servidor si no hay API key
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

// -------------------------------
// 🔹 Configurar rutas absolutas
// -------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde "public"
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// Ruta principal
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// -------------------------------
// 🔹 Configurar conexión a OpenAI
// -------------------------------
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// -------------------------------
// 🔹 Ruta del chatbot
// -------------------------------
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  // Validar mensaje
  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Mensaje vacío o inválido" });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("❌ Error con OpenAI:", error);
    res.status(500).json({
      error: "Error al procesar la solicitud con OpenAI",
      details: error.message,
    });
  }
});

// -------------------------------
// 🔹 Iniciar servidor
// -------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor activo en http://localhost:${PORT}`);
  console.log(`📂 Archivos servidos desde: ${publicPath}`);
});
