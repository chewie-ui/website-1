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
      location.href = `/edit/${postId}`;
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

const likePosts = document.querySelectorAll(".post-like");

likePosts.forEach((element) => {
  element.addEventListener("click", () => {
    let result;

    const child = element.firstElementChild;
    const parent = element.closest(".post-content");

    const postId = parent.getAttribute("data-post-id");

    fetch(`/posts/${postId}/like`, {
      method: "POST",
    })
      .then((rep) => rep.json())
      .then((data) => {
        if (data?.success) {
          element.querySelectorAll("div.like-opt").forEach((el) => {
            el.classList.add("hidden");
          });
          element.querySelector(`.${data.action}`).classList.remove("hidden");
          const likeCounter = element
            .querySelector(".like-counter")
            .querySelector("p").textContent;
          let newCounter;
          if (data.action === "liked") {
            newCounter = Number(likeCounter) + 1;
          } else {
            newCounter = Number(likeCounter) - 1;
          }
          element
            .querySelector(".like-counter")
            .querySelector("p").textContent = newCounter;
        }
      })
      .catch((err) => {
        console.error(err);
      });

    if (child.classList.contains("liked")) {
      result = "liked";
    } else {
      result = "not liked";
    }
  });
});
