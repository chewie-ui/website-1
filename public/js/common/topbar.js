const toggleMenu = document.getElementById("toggleMenu");
const burgerMenu = document.getElementById("burgerMenu");

if (toggleMenu) {
  toggleMenu.addEventListener("click", () => {
    burgerMenu.classList.toggle("active");
  });
}

document.addEventListener("click", (e) => {
  if (e.target.closest("[data-back]")) {
    history.back();
  }
});

const notificationButtons = document.querySelectorAll(".notification-button");

notificationButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById("notifications").classList.toggle("show");
  });
});

