const toggleMenu = document.getElementById("toggleMenu");
const burgerMenu = document.getElementById("burgerMenu");

if (toggleMenu) {
  toggleMenu.addEventListener("click", () => {
    burgerMenu.classList.toggle("active");
  });
}
