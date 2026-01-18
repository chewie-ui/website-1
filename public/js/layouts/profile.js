const followButton = document.getElementById("followButton");

if (followButton) {
  followButton.addEventListener("click", async () => {
    const userId = followButton.dataset.userId;

    const res = await fetch(`/follow/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) return;

    const data = await res.json();

    // Update button text
    followButton.textContent = data.isFollowing ? "Unfollow" : "Follow";
    followButton.dataset.following = data.isFollowing;

    // Update followers count
    const followersCountEl = document.querySelector(".follows-info h3");
    followersCountEl.textContent = data.followersCount;
  });
}
