// Menú de tres puntos
const menuBtn = document.getElementById('menuBtn');
const menuList = document.getElementById('menuList');
menuBtn.onclick = () => menuList.classList.toggle('hidden');

// Chat básico
const chatForm = document.getElementById('chatForm');
const inputMsg = document.getElementById('inputMsg');
const messages = document.getElementById('messages');

chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const msg = document.createElement('div');
  msg.classList.add('msg');
  msg.textContent = inputMsg.value;
  messages.appendChild(msg);
  inputMsg.value = '';
  messages.scrollTop = messages.scrollHeight;
});

// Modal de login/registro
const modal = document.getElementById('auth-modal');
const toggleAuth = document.getElementById('toggle-auth');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const openAuth = document.getElementById('open-auth');
const userType = document.getElementById('user-type');
const regSchool = document.getElementById('reg-school');
const regTitle = document.getElementById('reg-title');

// ====== NUEVO ======
const closeAuth = document.getElementById('close-auth');
closeAuth.onclick = () => modal.classList.add('hidden');
// ====================

openAuth.onclick = () => modal.classList.remove('hidden');

toggleAuth.onclick = e => {
  e.preventDefault();
  const isLogin = !loginForm.classList.contains('hidden');
  document.getElementById('auth-title').textContent = isLogin ? 'Registro' : 'Iniciar Sesión';
  loginForm.classList.toggle('hidden');
  registerForm.classList.toggle('hidden');
  toggleAuth.textContent = isLogin ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate';
};

userType.onchange = () => {
  regSchool.classList.add('hidden');
  regTitle.classList.add('hidden');
  if (userType.value === 'estudiante' || userType.value === 'padre' || userType.value === 'profesor') {
    regSchool.classList.remove('hidden');
  } else if (userType.value === 'especialista') {
    regTitle.classList.remove('hidden');
  }
};

// Registro (temporal en localStorage)
registerForm.onsubmit = e => {
  e.preventDefault();
  const userData = {
    nombre: document.getElementById('reg-name').value,
    telefono: document.getElementById('reg-phone').value,
    tipo: userType.value,
    escuela: regSchool.value,
  };
  localStorage.setItem('usuario', JSON.stringify(userData));
  alert("Registro exitoso. Ya puedes iniciar sesión.");
  modal.classList.add('hidden');
};

// Login (demo)
loginForm.onsubmit = e => {
  e.preventDefault();
  alert("Inicio de sesión exitoso (modo demo).");
  modal.classList.add('hidden');
};
