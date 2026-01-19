const postOptions = document.querySelectorAll(".post-options svg");

postOptions.forEach((svg) => {
  svg.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const menus = document.querySelectorAll(".options-menu.show");
    const menu = this.parentElement.querySelector(".options-menu");
    const isOpen = menu.classList.contains("show");

    menus.forEach((menu) => {
      menu.classList.remove("show");
    });

    if (!isOpen) {
      menu.classList.toggle("show");
    }
  });
});

document.addEventListener("click", (e) => {
  const option = e.target.closest(".option");
  if (!option) return;
  e.stopPropagation();

  const action = option.getAttribute("opt-content");
  if (!action) return console.error("action invalid", action);

  const post = option.closest(".post-content");
  const postId = post?.dataset.postId;
  if (!postId) return console.error("postId invalid", postId);

  switch (action) {
    case "delete":
      fetch(`/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Delete failed");
          return res.json();
        })
        .then(() => {
          post.remove();
        })
        .catch((err) => {
          console.error(err);
          alert("Erreur lors de la suppression");
        });
      break;

    case "edit":
      console.log("editing");
      break;
    case "report":
      console.log("reporting");
      break;
  }

  document
    .querySelectorAll(".options-menu.show")
    .forEach((menu) => menu.classList.remove("show"));
});

window.addEventListener("click", () => {
  document.querySelectorAll(".options-menu.show").forEach((menu) => {
    menu.classList.remove("show");
  });
});
