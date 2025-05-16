import React, { useState, useRef } from "react";
import RecordRTC from "recordrtc";

function HighlightText({ text, errorWords }) {
  if (!text) return null;
  const words = text.split(/(\s+)/);

  return (
    <p style={{ fontSize: 20, fontStyle: "italic", lineHeight: 1.6, margin: 0 }}>
      {words.map((word, idx) => {
        const cleanWord = word.replace(/[.,!?]/g, "").toLowerCase();
        const isError = errorWords.some(
          (ew) => ew.toLowerCase() === cleanWord
        );
        return (
          <span
            key={idx}
            style={{
              color: isError ? "#d93025" : "#202124",
              backgroundColor: isError ? "#fce8e6" : "transparent",
              textDecoration: isError ? "underline" : "none",
              whiteSpace: "pre-wrap",
            }}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}

export default function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [status, setStatus] = useState("Ready to record");
  const [referenceText, setReferenceText] = useState(
    "The quick brown fox jumps over the lazy dog."
  );
  const [scoreData, setScoreData] = useState(null);
  const recorderRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorderRef.current = new RecordRTC(stream, {
        type: "audio",
        mimeType: "audio/wav",
        recorderType: RecordRTC.StereoAudioRecorder,
        desiredSampRate: 16000,
        numberOfAudioChannels: 1,
      });
      recorderRef.current.startRecording();
      setRecording(true);
      setStatus("Recording...");
      setScoreData(null);
    } catch (err) {
      setStatus("Error accessing microphone: " + err.message);
    }
  };

  const stopRecording = async () => {
    if (!recorderRef.current) return;
    recorderRef.current.stopRecording(async () => {
      const blob = recorderRef.current.getBlob();
      const url = URL.createObjectURL(blob);
      setAudioURL(url);

      const base64Audio = await blobToBase64(blob);
      await sendAudioToBackend(base64Audio, referenceText);

      setRecording(false);
      setStatus("Recording stopped");
    });
  };

  const blobToBase64 = (blob) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(blob);
    });

  const sendAudioToBackend = async (base64Audio, referenceText) => {
    setStatus("Sending audio to server...");
    try {
      const res = await fetch("http://localhost:5000/api/score-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audio: base64Audio, referenceText }),
      });
      const data = await res.json();
      if (res.ok) {
        setScoreData(data);
        setStatus("Results received");
      } else {
        setStatus("Error from server: " + (data.error || "Unknown error"));
        setScoreData(null);
      }
    } catch (err) {
      setStatus("Connection error: " + err.message);
      setScoreData(null);
    }
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "30px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#202124",
        padding: 20,
        boxShadow: "0 4px 12px rgb(0 0 0 / 0.1)",
        borderRadius: 10,
        backgroundColor: "#fff",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>
        🎙️ Speaking Test Demo
      </h1>

      {/* Câu mẫu */}
      <section
        style={{
          backgroundColor: "#e8f0fe",
          borderRadius: 8,
          padding: 20,
          marginBottom: 25,
          fontSize: 22,
          fontWeight: "600",
          textAlign: "center",
          color: "#1a73e8",
          userSelect: "text",
          minHeight: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <img
          src="https://img.icons8.com/ios-filled/30/1a73e8/microphone.png"
          alt="Microphone"
          style={{ flexShrink: 0 }}
        />
        <span>{referenceText}</span>
      </section>

      {/* Nút ghi âm */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <button
          onClick={recording ? stopRecording : startRecording}
          style={{
            padding: "14px 40px",
            fontSize: 18,
            backgroundColor: recording ? "#d93025" : "#1a73e8",
            color: "white",
            border: "none",
            borderRadius: 30,
            cursor: "pointer",
            boxShadow: recording
              ? "0 4px 15px rgba(217,48,37,0.5)"
              : "0 4px 15px rgba(26,115,232,0.5)",
            transition: "background-color 0.3s ease",
          }}
          aria-label={recording ? "Stop recording" : "Start recording"}
        >
          {recording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>

      {/* Trạng thái */}
      <p
        style={{
          textAlign: "center",
          fontSize: 16,
          color: recording ? "#d93025" : "#555",
          marginBottom: 25,
          minHeight: 24,
          fontWeight: 600,
        }}
      >
        {status}
      </p>

      {/* Player audio */}
      {audioURL && (
        <audio
          controls
          src={audioURL}
          style={{
            display: "block",
            margin: "0 auto 30px auto",
            width: "100%",
            borderRadius: 8,
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        />
      )}

      {/* Kết quả chấm điểm */}
      {scoreData && (
        <section
          style={{
            backgroundColor: "#f9fafb",
            padding: 20,
            borderRadius: 8,
            boxShadow: "inset 0 0 6px rgb(0 0 0 / 0.05)",
            color: "#202124",
          }}
        >
          <h2 style={{ marginBottom: 16, textAlign: "center", color: "#1a73e8" }}>
            Test Results
          </h2>

          <div
            style={{
              fontSize: 20,
              fontWeight: "700",
              marginBottom: 14,
              textAlign: "center",
            }}
          >
            Band IELTS:{" "}
            <span style={{ color: "#d93025" }}>
              {scoreData.score ?? "N/A"}
            </span>
          </div>

          <div
            style={{
              fontSize: 16,
              lineHeight: 1.4,
              marginBottom: 20,
              padding: "0 12px",
              minHeight: 60,
              textAlign: "center",
              fontStyle: "italic",
              color: "#3c4043",
            }}
          >
            Feedback: {scoreData.feedback ?? "No feedback provided."}
          </div>

          <h3
            style={{
              borderBottom: "1px solid #ddd",
              paddingBottom: 8,
              marginBottom: 12,
              fontWeight: "600",
            }}
          >
            Detailed Scores
          </h3>

          <ul
            style={{
              listStyle: "none",
              paddingLeft: 0,
              fontSize: 16,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 12,
              marginBottom: 0,
            }}
          >
            <li>
              <strong>Accuracy:</strong> {scoreData.accuracyScore ?? "N/A"}
            </li>
            <li>
              <strong>Fluency:</strong> {scoreData.fluencyScore ?? "N/A"}
            </li>
            <li>
              <strong>Completeness:</strong> {scoreData.completenessScore ?? "N/A"}
            </li>
            <li>
              <strong>Pronunciation:</strong> {scoreData.pronScore ?? "N/A"}
            </li>
          </ul>

          {/* Highlight từ sai */}
          {scoreData.miscueWords?.length > 0 && (
            <>
              <h3 style={{ marginTop: 30, fontWeight: "600" }}>
                Incorrect Words Highlighted
              </h3>
              <div
                style={{
                  backgroundColor: "#fff3f2",
                  padding: 15,
                  borderRadius: 8,
                  border: "1px solid #d93025",
                  marginTop: 10,
                  fontSize: 18,
                  fontStyle: "italic",
                  lineHeight: 1.5,
                }}
              >
                <HighlightText
                  text={referenceText}
                  errorWords={scoreData.miscueWords}
                />
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
}
