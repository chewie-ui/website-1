const postTextarea = document.getElementById("postTextarea");
const charCount = document.getElementById("charCount");

postTextarea.addEventListener("input", () => {
  let length = postTextarea.value.length;

  if (length > 500) {
    postTextarea.value = postTextarea.value.substring(0, 500);
    length = 500;
  }

  charCount.textContent = `${length}/500`;
});
