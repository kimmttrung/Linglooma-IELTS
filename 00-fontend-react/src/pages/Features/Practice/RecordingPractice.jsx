import React, { useState, useRef } from "react";
import RecordRTC from "recordrtc";
import { FaMicrophone } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import HighlightTextWithTooltip from "./HighlightText";


const PhonemeDetails = ({ phonemeDetails }) => {
  if (!phonemeDetails || phonemeDetails.length === 0) return null;

  const groupedByWord = phonemeDetails.reduce((acc, item) => {
    if (!acc[item.wordIndex]) acc[item.wordIndex] = { word: item.word, phonemes: [] };
    acc[item.wordIndex].phonemes.push(item);
    return acc;
  }, {});

  return (
    <div className="mt-8 bg-gray-100 rounded p-4 shadow-inner max-h-64 overflow-y-auto">
      <h4 className="font-bold mb-2 text-blue-800 text-center">Phoneme Details</h4>
      {Object.values(groupedByWord).map(({ word, phonemes }, idx) => (
        <div key={idx} className="mb-4">
          <div className="font-semibold text-lg mb-1">Word: "{word}"</div>
          <div className="flex flex-wrap gap-3">
            {phonemes.map(({ phoneme, accuracyScore, errorType }, i) => (
              <div
                key={i}
                className={`p-2 rounded border ${
                  errorType === "Good"
                    ? "border-green-500 text-green-600"
                    : "border-red-500 text-red-600"
                }`}
                title={`Error type: ${errorType}`}
              >
                <div>IPA: <strong>{phoneme}</strong></div>
                <div>Score: {accuracyScore.toFixed(1)}%</div>
                <div>Status: {errorType}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const RecordingPractice = ({ currentQuestion, referenceText, setOnSubmit }) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [status, setStatus] = useState("Ready to record");
  const [scoreData, setScoreData] = useState(null);
  const recorderRef = useRef(null);
  const audioRef = useRef(null);

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
      setAudioURL(null);
    } catch (err) {
      setStatus("Error accessing microphone: " + err.message);
    }
  };

  const stopRecording = () => {
    if (!recorderRef.current) return;
    recorderRef.current.stopRecording(() => {
      const blob = recorderRef.current.getBlob();
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      setRecording(false);
      setStatus("Recording stopped");

      if (recorderRef.current.stream) {
        recorderRef.current.stream.getTracks().forEach((track) => track.stop());
      }
    });
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const blobToBase64 = (blob) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(blob);
    });

  const sendAudioToBackend = async () => {
    if (!recorderRef.current) {
      setStatus("No recording found");
      return;
    }
    setStatus("Sending audio to server...");
    try {
      const blob = recorderRef.current.getBlob();
      const base64Audio = await blobToBase64(blob);

      const res = await fetch("http://localhost:5000/api/score-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audio: base64Audio, referenceText }),
      });

      const data = await res.json();
      if (res.ok) {
        setScoreData(data);
        setStatus("Results received");
        if (setOnSubmit) setOnSubmit(true);
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
    <section className="p-5 bg-white rounded-lg shadow-sm max-w-xl mx-auto">
      <h2 className="py-1.5 mb-5 text-xl font-extrabold text-sky-800 border-b border-gray-200 text-center">
        Speaking Practice
      </h2>

      {/* Reference text */}
      <div
        className="mb-6 p-4 bg-blue-50 rounded text-center text-lg font-semibold text-blue-700 select-text"
        style={{ minHeight: 70,  textAlign: "center", lineHeight: "1.5",  whiteSpace: "normal" }}
      >
        {scoreData?.wordsAssessment?.length > 0 ? (
          <HighlightTextWithTooltip
            text={referenceText}
            wordsAssessment={scoreData.wordsAssessment}
          />
        ) : (
          <span>{referenceText}</span>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-6 items-center">
          {!recording ? (
            <button
              onClick={startRecording}
              className="flex justify-center items-center w-20 h-20 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition"
              aria-label="Start Recording"
            >
              <FaMicrophone size={40} />
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex justify-center items-center w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transition"
              aria-label="Stop Recording"
            >
              <FaMicrophone size={40} />
            </button>
          )}

          <Button
            variant="secondary"
            onClick={stopRecording}
            disabled={!recording}
            className="px-4 py-2"
          >
            Stop
          </Button>

          <Button
            variant="secondary"
            onClick={playAudio}
            disabled={!audioURL}
            className="px-4 py-2"
          >
            Play
          </Button>

          <Button
            variant="primary"
            onClick={sendAudioToBackend}
            disabled={!audioURL}
            className="px-4 py-2"
          >
            Submit
          </Button>
        </div>

        <p className="text-center font-semibold text-gray-700">{status}</p>

        {/* Audio player */}
        {audioURL && (
          <audio
            ref={audioRef}
            controls
            src={audioURL}
            className="w-full rounded shadow-md mt-4"
          />
        )}
      </div>

      {/* Results */}
      {scoreData && (
        <div className="mt-8 bg-gray-50 rounded p-4 shadow-inner">
          <h3 className="text-center text-xl font-bold mb-4 text-blue-700">
            Test Results
          </h3>
          <p className="text-center text-lg mb-2">
            <strong>Band IELTS:</strong>{" "}
            <span className="text-red-600">{scoreData.score ?? "N/A"}</span>
          </p>
<p
  className="text-center italic text-gray-700 mb-4"
  style={{ whiteSpace: "pre-wrap",  textAlign: "left"  }}
>
  {scoreData.feedback ?? "No feedback provided."}
</p>

          <div className="grid grid-cols-2 gap-4 text-gray-800 font-semibold">
            <div>Accuracy: {scoreData.accuracyScore ?? "N/A"}</div>
            <div>Fluency: {scoreData.fluencyScore ?? "N/A"}</div>
            <div>Completeness: {scoreData.completenessScore ?? "N/A"}</div>
            <div>Pronunciation: {scoreData.pronScore ?? "N/A"}</div>
          </div>

          {/* {scoreData.miscueWords?.length > 0 && (
            <div className="mt-6 p-4 bg-red-50 border border-red-300 rounded text-red-700">
              <h4 className="font-semibold mb-2">Incorrect Words Highlighted</h4>
              <HighlightTextWithTooltip
                text={referenceText}
                wordsAssessment={scoreData.wordsAssessment}
              />
            </div>
          )} */}

          <PhonemeDetails phonemeDetails={scoreData.phonemeDetails} />
        </div>
      )}
    </section>
  );
};

export default RecordingPractice;