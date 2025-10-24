// === ELEMENTOS DEL DOM ===
const chatToggle = document.getElementById("chatToggle");
const chatPanel = document.getElementById("chatPanel");
const closeChat = document.getElementById("closeChat");
const messages = document.getElementById("messages");
const chatForm = document.getElementById("chatForm");
const inputMsg = document.getElementById("inputMsg");

// Mostrar/ocultar chat
chatToggle.onclick = () => chatPanel.style.display = "flex";
closeChat.onclick = () => chatPanel.style.display = "none";

// === RESPUESTAS PREDEFINIDAS ===
const respuestas = [
  {
    palabras: ["bullying", "acoso", "molestan", "agreden"],
    respuesta: "El bullying es una conducta agresiva y repetitiva que causa daño físico o psicológico. Según la UNESCO, 1 de cada 3 estudiantes ha sufrido acoso escolar. No estás solo 💜",
  },
  {
    palabras: ["triste", "deprimido", "mal", "solo", "llorar"],
    respuesta: "Siento mucho que te sientas así 😔. Hablar de lo que pasa es un paso muy importante. No estás solo, y hay personas que pueden ayudarte.",
  },
  {
    palabras: ["síntomas", "signos", "señales"],
    respuesta: "Algunos síntomas comunes del bullying son: miedo de ir a clases, aislamiento, cambios en el sueño o apetito, o bajo rendimiento escolar. Si ves algo así, busca apoyo 💡",
  },
  {
    palabras: ["ayuda", "necesito", "hablar", "apoyo"],
    respuesta: "Gracias por confiar en LuzEscolar 💜. Podemos orientarte para hablar con un especialista o docente de confianza. ¿Quieres que te comparta contactos de ayuda profesional?",
  },
  {
    palabras: ["investigación", "datos", "estadísticas"],
    respuesta: "Según la ONU (2023), más del 32% de los jóvenes ha experimentado alguna forma de acoso escolar. Promover el respeto y la empatía es fundamental 🌍.",
  },
  {
    palabras: ["gracias", "ok", "bien", "listo"],
    respuesta: "Gracias a ti por hablar conmigo 💜. Recuerda: pedir ayuda no es debilidad, es fortaleza. Estoy aquí cuando necesites conversar.",
  },
];
// === FUNCIÓN DE RESPUESTA CON IA REAL ===
async function obtenerRespuesta(mensaje) {
  const msgLower = mensaje.toLowerCase();

  // 1. Buscar si hay respuesta predefinida (mantiene tu lógica original)
  for (const obj of respuestas) {
    if (obj.palabras.some(p => msgLower.includes(p))) {
      return obj.respuesta;
    }
  }

  // 2. Si no hay coincidencias, usar la IA del servidor
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: mensaje }),
    });

    const data = await res.json();
    return data.reply || "Lo siento, no pude entenderte bien 💭";
  } catch (error) {
    console.error("Error al conectar con la IA:", error);
    return "⚠️ No se pudo contactar con el asistente en este momento. Intenta más tarde.";
  }
}


// === EFECTO DE ESCRITURA (IA) ===
function escribirMensaje(texto, elemento) {
  let i = 0;
  const intervalo = setInterval(() => {
    elemento.textContent += texto.charAt(i);
    i++;
    if (i >= texto.length) clearInterval(intervalo);
    messages.scrollTop = messages.scrollHeight;
  }, 40);
}

// === ENVÍO DE MENSAJE ===
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = inputMsg.value.trim();
  if (!msg) return;

  // Mensaje del usuario
  const userMsg = document.createElement("div");
  userMsg.className = "msg user";
  userMsg.textContent = msg;
  messages.appendChild(userMsg);
  inputMsg.value = "";
  messages.scrollTop = messages.scrollHeight;

  // Procesar y mostrar respuesta del bot
  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.className = "msg bot";
    messages.appendChild(botMsg);

    obtenerRespuesta(msg).then(respuesta => {
  escribirMensaje(respuesta, botMsg);
});


    // Si el mensaje incluye palabras graves, ofrecer ayuda extra
    if (/(suicidio|matar|autolesión|herir)/i.test(msg)) {
      setTimeout(() => {
        const extra = document.createElement("div");
        extra.className = "msg bot";
        escribirMensaje(
          "Si sientes que podrías lastimarte o estás en peligro, busca ayuda inmediatamente. En Colombia puedes comunicarte al 123 o a la línea 106 (Atención Psicológica). 💜",
          extra
        );
        messages.appendChild(extra);
      }, 1000);
    }

  }, 800);
});

// === MODAL DE LOGIN ===
const loginModal = document.getElementById("loginModal");
const openLogin = document.getElementById("openLogin");
const closeLogin = document.getElementById("closeLogin");

openLogin.onclick = () => loginModal.style.display = "flex";
closeLogin.onclick = () => loginModal.style.display = "none";

window.onclick = (e) => {
  if (e.target == loginModal) loginModal.style.display = "none";
};

document.getElementById("tipoUsuario").addEventListener("change", (e) => {
  const tipo = e.target.value;
  document.getElementById("titulo").style.display =
    tipo === "especialista" ? "block" : "none";
});

// === SERVICE WORKER ===
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
