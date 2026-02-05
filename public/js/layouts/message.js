document.addEventListener("DOMContentLoaded", () => {
  const chat = document.getElementById("chatMessages");
  if (!chat) return;

  chat.scrollTop = chat.scrollHeight;
});
