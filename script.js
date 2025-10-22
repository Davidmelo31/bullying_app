// Menú desplegable de los tres puntos
const menuBtn = document.getElementById("menuBtn");
const menuContent = document.getElementById("menuContent");

menuBtn.onclick = () => {
  menuContent.style.display = menuContent.style.display === "block" ? "none" : "block";
};

window.onclick = (e) => {
  if (!menuBtn.contains(e.target)) {
    menuContent.style.display = "none";
  }
};

// Modal de inicio/registro
const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const tipoUsuario = document.getElementById("tipoUsuario");
const extraCampos = document.getElementById("extraCampos");

openModal.onclick = () => modal.style.display = "flex";
closeModal.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

// Campos dinámicos según el rol
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

// Registro simulado
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Datos registrados correctamente ✅");
  modal.style.display = "none";
});
