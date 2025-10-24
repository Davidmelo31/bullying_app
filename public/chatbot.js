// public/chatbot.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    // Mostrar mensaje del usuario
    chatBox.innerHTML += `<div class="user-msg"><strong>Tú:</strong> ${message}</div>`;
    input.value = "";

    // Enviar mensaje al servidor (IA)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      // Mostrar respuesta del bot
      chatBox.innerHTML += `<div class="bot-msg"><strong>LuzEscolar:</strong> ${data.reply}</div>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    } catch (err) {
      chatBox.innerHTML += `<div class="bot-msg">⚠️ Error al conectar con el servidor.</div>`;
    }
  });
});
