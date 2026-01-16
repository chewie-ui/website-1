const form = document.querySelector("form");
const formBtn = document.querySelector("button");
const messageBox = document.querySelector(".message-box");

formBtn.onclick = async function (e) {
  messageBox.innerHTML = "";
  e.preventDefault();
  const inputs = Array.from(document.querySelectorAll("input"));

  const pwd = inputs.find((e) => e.name === "password");
  const conformPwd = inputs.find((e) => e.name === "conformPassword");

  if (pwd.value !== conformPwd.value) {
    return (messageBox.innerHTML = `Password doesn't match`);
  }

  // add conditions for email and password

  form.submit();
};
