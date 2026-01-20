const suggestionFunc = () => {
  const suggestionFollowBtn = document.querySelectorAll(
    ".suggestion-follow-btn",
  );
  const suggestionRemoveBtn = document.querySelectorAll(
    ".suggestion-remove-btn",
  );

  suggestionFollowBtn.forEach((followBtn) => {
    followBtn.addEventListener("click", async () => {
      const userId = followBtn
        .closest(".suggestion-box")
        .getAttribute("data-user-id");
      const res = await fetch(`/follow/${userId}`, {
        method: "POST",
      });

      const data = await res.json();
      console.log(data);

      followBtn.classList.remove("followed", "unfollowed");

      if (data.isFollowing) {
        followBtn.classList.add("unfollowed");
        followBtn.textContent = "Unfollow";
      } else {
        followBtn.classList.add("followed");
        followBtn.textContent = "Follow";
      }

      followBtn.dataset.following = data.isFollowing;
    });
  });

  suggestionRemoveBtn.forEach((removeBtn) => {
    removeBtn.addEventListener("click", async () => {
      const userId = removeBtn
        .closest(".suggestion-box")
        .getAttribute("data-user-id");
      const res = await fetch(`hide-suggestion/${userId}`, { method: "post" });

      const data = await res.json();

      console.log(data);

      if (data) {
        removeBtn.closest(".suggestion-box").remove();
      }
    });
  });
};

export default suggestionFunc;
