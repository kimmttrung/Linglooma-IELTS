import React, { useState, useRef } from "react";
import RecordRTC from "recordrtc";

export default function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [status, setStatus] = useState("Sẵn sàng ghi âm");
  const [referenceText, setReferenceText] = useState(
    "This is the sample sentence you should read."
  );
  const [scoreData, setScoreData] = useState(null); // lưu kết quả điểm và feedback
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
      setStatus("Đang ghi âm...");
      setScoreData(null); // reset điểm cũ khi bắt đầu ghi âm mới
    } catch (err) {
      setStatus("Lỗi khi lấy micro: " + err.message);
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
      setStatus("Dừng ghi âm");
    });
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result.split(",")[1]);
      };
      reader.readAsDataURL(blob);
    });
  };

  const sendAudioToBackend = async (base64Audio, referenceText) => {
    setStatus("Đang gửi audio lên server...");
    try {
      const res = await fetch("http://localhost:5000/api/score-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audio: base64Audio, referenceText }),
      });
      const data = await res.json();
      if (res.ok) {
        setScoreData(data);
        setStatus("Đã nhận kết quả từ server");
      } else {
        setStatus("Lỗi khi gửi audio: " + data.error);
        setScoreData(null);
      }
    } catch (err) {
      setStatus("Lỗi kết nối server: " + err.message);
      setScoreData(null);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h2>🎙️ Ghi âm WAV 16kHz mono và gửi backend</h2>

      <div
        style={{
          backgroundColor: "#f0f0f0",
          padding: 15,
          borderRadius: 5,
          marginBottom: 20,
          fontStyle: "italic",
          fontSize: 18,
          minHeight: 60,
          lineHeight: "1.5",
          whiteSpace: "pre-wrap",
          userSelect: "text",
        }}
      >
        {referenceText}
      </div>

      <button
        onClick={recording ? stopRecording : startRecording}
        style={{
          padding: "10px 20px",
          backgroundColor: recording ? "#f44336" : "#4caf50",
          color: "white",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
          marginBottom: 20,
        }}
      >
        {recording ? "Dừng ghi âm" : "Bắt đầu ghi âm"}
      </button>

      <p><b>Trạng thái:</b> {status}</p>

      {audioURL && (
        <audio controls src={audioURL} style={{ width: "100%", marginTop: 10 }} />
      )}

      {scoreData && (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            border: "1px solid #ccc",
            borderRadius: 5,
            backgroundColor: "#fafafa",
            whiteSpace: "pre-wrap",
          }}
        >
          <h3>Kết quả chấm điểm</h3>
          <p><b>Band IELTS:</b> {scoreData.score}</p>
          <p><b>Điểm tổng (raw score):</b> {scoreData.rawScore}</p>
          <p><b>Phản hồi:</b> {scoreData.feedback}</p>

          <h4>Điểm chi tiết</h4>
          <ul>
            <li><b>AccuracyScore:</b> {scoreData.accuracyScore ?? "N/A"}</li>
            <li><b>FluencyScore:</b> {scoreData.fluencyScore ?? "N/A"}</li>
            <li><b>CompletenessScore:</b> {scoreData.completenessScore ?? "N/A"}</li>
            <li><b>PronScore:</b> {scoreData.pronScore ?? "N/A"}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
