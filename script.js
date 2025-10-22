const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const sections = document.querySelectorAll("main section");

// Mostrar / ocultar menú
menuBtn.addEventListener("click", () => {
  menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// Cambiar de sección al seleccionar del menú
menu.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", () => {
    const sectionId = item.getAttribute("data-section");

    sections.forEach((sec) => {
      sec.classList.remove("active");
      if (sec.id === sectionId) sec.classList.add("active");
    });

    menu.style.display = "none";
  });
});
