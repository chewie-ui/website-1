const avatarPicture = document.getElementById("avatarPicture");
const form = avatarPicture.parentElement;
const input = form.querySelector("input");

avatarPicture.addEventListener("click", () => {
  input.click();
});

input.addEventListener("change", () => {
  if (input.files && input.files.length > 0) {
    avatarPicture.src = URL.createObjectURL(input.files[0]);

    form.submit();
  }
});
