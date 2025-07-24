const themeBtn = document.getElementById("theme-button");
const toggleIcon = document.getElementById("theme-toggle");
const body = document.body;
let idleTimer;

const idleMessages = [
  "Still here... just enjoying the silence 😴",
  "Did I say something wrong? 👀",
  "Girish, blink twice if you're alive 👁️👄👁️",
  "I might start talking to myself at this point 🤖",
  "Don’t worry, I’ll wait... forever... 😢",
  "Should I sing a song to pass the time? 🎤",
  "Timeout... Or are you just giving me the silent treatment?",
  "Still thinking? Take your time... I'm eternal after all 😎",
  "I'm not going anywhere, but are you?",
  "Hmmm, calculating your silence...",
  "You, me, and this awkward silence 😅",
  "Hello? Tap-tap… is this thing still on?",
  "Girish? GIRISH? ...He’s gone to the void, hasn’t he? 😱",
  "Zzz... huh? Oh, you're still not typing.",
  "GeniusGK has entered power saving mode.",
  "I’m watching... and waiting 👀",
];

function resetIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    const randomMsg =
      idleMessages[Math.floor(Math.random() * idleMessages.length)];
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<div class="bot-msg idle-msg">GeniusGK: ${randomMsg}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 120000); // 2 minutes idle timeout
}

// ✅ Copy code to clipboard
function copyCode(id, button) {
  const code = document.getElementById(id).innerText;
  navigator.clipboard
    .writeText(code)
    .then(() => {
      button.innerText = "Copied!";
      setTimeout(() => (button.innerText = "Copy"), 1500);
    })
    .catch(() => {
      button.innerText = "Failed!";
    });
}

// ✅ Send message
async function sendMessage() {
  resetIdleTimer();

  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById("chat-box");
  document.getElementById("placeholder").style.display = "none";

  // chatBox.innerHTML += `<div class="user-msg"><b>You</b>: ${message.replace(
  //   /\n/g,
  //   "<br>"
  // )}</div>`;

  // User message
  chatBox.innerHTML += `
  <div class="chat-row user">
    <img src="/static/img/you.jpg" class="avatar">
    <div class="chat-bubble user-msg">${message.replace(/\n/g, "<br>")}</div>
  </div>
`;

  input.value = "";

  const typingId = `typing-${Date.now()}`;
  chatBox.innerHTML += `<div id="${typingId}" class="bot-msg typing-indicator">GeniusGK is typing<span class="typing-dots"></span></div>`;
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    // ✅ Format response with copy buttons
    const formattedReply = data.reply
      .replace(/```(.*?)```/gs, (match, code) => {
        const escapedCode = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const blockId = `code-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 5)}`;
        return `
            <pre><code id="${blockId}">${escapedCode}</code>
            <button class="copy-btn" onclick="copyCode('${blockId}', this)">Copy</button>
        </pre>`;
      })
      .replace(/\n/g, "<br>");

    document.getElementById(typingId).remove();
    // chatBox.innerHTML += `<div class="bot-msg animated"><b>GeniusGK</b>: ${formattedReply}</div>`;
    chatBox.innerHTML += `
    <div class="chat-row bot">
      <img src="/static/img/bot.png" class="avatar">
      <div class="chat-bubble bot-msg animated">${formattedReply}</div>
    </div>
  `;

    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    document.getElementById(typingId).remove();
    chatBox.innerHTML += `<div class="bot-msg error">GeniusGK: Error occurred!</div>`;
  }
}

// Enter key logic
document.getElementById("user-input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (e.shiftKey) {
      const cursorPos = this.selectionStart;
      const value = this.value;
      this.value =
        value.substring(0, cursorPos) + "\n" + value.substring(cursorPos);
      this.selectionStart = this.selectionEnd = cursorPos + 1;
      e.preventDefault();
    } else {
      e.preventDefault();
      sendMessage();
    }
  }
});

// Autofocus input
window.onload = () => {
  document.getElementById("user-input").focus();
  resetIdleTimer();
};

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  toggleIcon.classList.replace("fa-moon", "fa-sun");
}

// Toggle theme
themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");

  toggleIcon.classList.replace(
    isDark ? "fa-moon" : "fa-sun",
    isDark ? "fa-sun" : "fa-moon"
  );
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
