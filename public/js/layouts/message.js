document.addEventListener("DOMContentLoaded", () => {
  socket.on("new-message", (msg) => {
    // si c’est pas la conv active → ignore (ou badge plus tard)
    if (msg.conversation !== window.currentConversation) return;

    appendMessage(msg);
  });
  function appendMessage(msg) {
    const chatBox = document.getElementById("chatMessages");

    const div = document.createElement("div");
    div.classList.add(
      "message-box-container",
      msg.from._id === window.currentUserId ? "receipter" : "receiver",
    );

    div.innerHTML = `
    <div class="message-box">
      <p>${msg.content}</p>
    </div>
  `;

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  const sendBtn = document.getElementById("sendMessage");
  const input = document.querySelector(".field-input input");

  sendBtn.addEventListener("click", async () => {
    const content = input.value.trim();
    if (!content || !window.currentConversation) return;

    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversationId: window.currentConversation,
        content,
      }),
    });

    input.value = "";
  });

  const chatBox = document.getElementById("chatMessages");
  if (!chatBox) return;

  document.querySelectorAll(".friend-box").forEach((friend) => {
    friend.addEventListener("click", async () => {
      const userId = friend.dataset.id;
      const name = friend.dataset.name;
      const avatar = friend.dataset.avatar || "/images/default-pp.jpg";

      // 1️⃣ créer / récupérer la conversation
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const conversation = await res.json();
      if (window.currentConversation) {
        socket.emit("leave-conversation", window.currentConversation);
      }

      socket.emit("join-conversation", conversation._id);
      window.currentConversation = conversation._id;

      document.getElementById("convName").textContent = name;
      document.getElementById("convAvatar").src = avatar;

      // 3️⃣ charger les messages
      const msgRes = await fetch(`/api/messages/${conversation._id}`);
      const messages = await msgRes.json();

      console.log(messages);

      chatBox.innerHTML = "";

      messages.forEach((msg) => {
        const div = document.createElement("div");
        div.classList.add(
          "message-box-container",
          msg.from._id === window.currentUserId ? "receipter" : "receiver",
        );

        div.innerHTML = `
          <div class="message-box">
            <p>${msg.content}</p>
          </div>
        `;

        chatBox.appendChild(div);
      });

      chatBox.scrollTop = chatBox.scrollHeight;
    });
  });
});
