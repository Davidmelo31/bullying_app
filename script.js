// --- Menú ---
const menuBtn = document.getElementById("menuBtn");
const menuContent = document.getElementById("menuContent");

menuBtn.onclick = () => {
  menuContent.style.display = menuContent.style.display === "block" ? "none" : "block";
};
window.onclick = (e) => {
  if (!menuBtn.contains(e.target)) menuContent.style.display = "none";
};

// --- Modal ---
const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const tipoUsuario = document.getElementById("tipoUsuario");
const extraCampos = document.getElementById("extraCampos");

openModal.onclick = () => modal.style.display = "flex";
closeModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

tipoUsuario.addEventListener("change", () => {
  const tipo = tipoUsuario.value;
  let campos = "";
  if (tipo === "estudiante" || tipo === "profesor" || tipo === "padre") {
    campos += `<input type="text" placeholder="Colegio al que pertenece" required>`;
  } else if (tipo === "especialista") {
    campos += `<input type="file" accept="image/*" required>`;
  }
  extraCampos.innerHTML = campos;
});

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("✅ Registro completado con éxito");
  modal.style.display = "none";
});

// --- Chat ---
const chatBtn = document.getElementById("chatBtn");
const chatBox = document.getElementById("chatBox");
const closeChat = document.getElementById("closeChat");
const sendMsg = document.getElementById("sendMsg");
const userMessage = document.getElementById("userMessage");
const chatMessages = document.getElementById("chatMessages");

chatBtn.onclick = () => chatBox.style.display = "flex";
closeChat.onclick = () => chatBox.style.display = "none";

// Función para mostrar mensajes
function mostrarMensaje(texto, clase = "") {
  const msg = document.createElement("div");
  msg.className = "message " + clase;
  msg.textContent = texto;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  guardarChat();
}

// Guardar mensajes en localStorage
function guardarChat() {
  localStorage.setItem("chatGuardado", chatMessages.innerHTML);
}

// Cargar chat guardado al iniciar
window.onload = () => {
  const guardado = localStorage.getItem("chatGuardado");
  if (guardado) {
    chatMessages.innerHTML = guardado;
  } else {
    const mensajesAuto = [
      "Hola 👋 Soy tu asistente virtual de apoyo.",
      "Recuerda que siempre hay personas dispuestas a escucharte 💜",
      "¿Cómo te sientes hoy?"
    ];
    mensajesAuto.forEach((m, i) => setTimeout(() => mostrarMensaje(m), 1000 * (i + 1)));
  }
};

// Enviar mensaje
sendMsg.onclick = () => {
  const texto = userMessage.value.trim();
  if (!texto) return;
  mostrarMensaje(texto, "user");
  userMessage.value = "";

  // Respuesta automática
  setTimeout(() => {
    const respuestas = [
      "Gracias por compartir 😊",
      "No estás solo, respira y recuerda tu valor 💜",
      "Hablar ayuda, estoy aquí para escucharte 💬"
    ];
    const respuesta = respuestas[Math.floor(Math.random() * respuestas.length)];
    mostrarMensaje(respuesta);
  }, 1000);
};
