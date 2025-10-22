document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("auth-modal");
  const openAuth = document.getElementById("open-auth");
  const closeAuth = document.getElementById("close-auth");
  const toggleAuth = document.getElementById("toggle-auth");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const userType = document.getElementById("user-type");
  const regSchool = document.getElementById("reg-school");
  const regTitle = document.getElementById("reg-title");

  // 🔹 Abrir modal
  openAuth.onclick = () => modal.classList.remove("hidden");

  // 🔹 Cerrar modal con la X
  closeAuth.addEventListener("click", (e) => {
    e.stopPropagation();
    modal.classList.add("hidden");
  });

  // 🔹 Cerrar al tocar fuera del cuadro blanco
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  // 🔹 Alternar entre login y registro
  toggleAuth.onclick = (e) => {
    e.preventDefault();
    const isLogin = !loginForm.classList.contains("hidden");
    document.getElementById("auth-title").textContent = isLogin
      ? "Registro"
      : "Iniciar Sesión";
    loginForm.classList.toggle("hidden");
    registerForm.classList.toggle("hidden");
    toggleAuth.textContent = isLogin
      ? "¿Ya tienes cuenta? Inicia sesión"
      : "¿No tienes cuenta? Regístrate";
  };

  // 🔹 Mostrar campos según tipo de usuario
  userType.onchange = () => {
    regSchool.classList.add("hidden");
    regTitle.classList.add("hidden");
    if (
      userType.value === "estudiante" ||
      userType.value === "padre" ||
      userType.value === "profesor"
    ) {
      regSchool.classList.remove("hidden");
    } else if (userType.value === "especialista") {
      regTitle.classList.remove("hidden");
    }
  };

  // 🔹 Simular registro
  registerForm.onsubmit = (e) => {
    e.preventDefault();
    alert("Registro exitoso ✅");
    modal.classList.add("hidden");
  };

  // 🔹 Simular login
  loginForm.onsubmit = (e) => {
    e.preventDefault();
    alert("Inicio de sesión exitoso ✅");
    modal.classList.add("hidden");
  };
});
