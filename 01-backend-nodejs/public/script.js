let recognizing = false;
let recognition;
let timerInterval;
let seconds = 0;

const recordBtn = document.getElementById("recordBtn");
const timerDisplay = document.getElementById("timer");
const transcriptDisplay = document.getElementById("transcript");

// Kiểm tra hỗ trợ
if (!("webkitSpeechRecognition" in window)) {
  alert("Trình duyệt không hỗ trợ Web Speech API. Hãy dùng Google Chrome.");
} else {
  recognition = new webkitSpeechRecognition();
  recognition.lang = "vi-VN"; // ngôn ngữ tiếng Việt
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    recognizing = true;
    seconds = 0;
    timerDisplay.innerText = "Thời gian: 0s";
    timerInterval = setInterval(() => {
      seconds++;
      timerDisplay.innerText = `Thời gian: ${seconds}s`;
    }, 1000);
    recordBtn.innerText = "🛑 Kết thúc nói";
    transcriptDisplay.innerText = "Đang nghe...";
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    transcriptDisplay.innerText = transcript;
  };

  recognition.onerror = (event) => {
    transcriptDisplay.innerText = `❌ Lỗi: ${event.error}`;
  };

  recognition.onend = () => {
    recognizing = false;
    clearInterval(timerInterval);
    recordBtn.innerText = "🎤 Bắt đầu nói";
  };
}

recordBtn.addEventListener("click", () => {
  if (!recognizing) {
    recognition.start();
  } else {
    recognition.stop();
  }
});
