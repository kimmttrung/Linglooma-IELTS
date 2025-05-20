import React, { useState, useRef } from "react";
import RecordRTC from "recordrtc";
import { FaMicrophone } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import "react-tooltip/dist/react-tooltip.css";
import HighlightTextWithTooltip from "./HighlightText";
import TextToSpeechButton from "./TextToSpeechButton";

const IncorrectPhonemesTable = ({ data }) => {
  if (!data || data.length === 0) return null;

  const maxPhonemes = data.reduce(
    (max, item) => Math.max(max, item.phonemes.length),
    0
  );
  const phonemeHeaders = Array.from({ length: maxPhonemes }, (_, i) => `Phoneme ${i + 1}`);

  return (
    <div className="mt-8 bg-white rounded shadow p-4 overflow-x-auto border border-red-300">
      <h4 className="text-red-700 font-bold mb-3 text-center">
        Incorrect Phonemes Detail
      </h4>
      <table className="min-w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-red-100">
            <th className="border border-gray-300 px-3 py-1 text-left">Word</th>
            <th className="border border-gray-300 px-3 py-1">Accuracy Score</th>
            <th className="border border-gray-300 px-3 py-1">Error Type</th>
            {phonemeHeaders.map((header) => (
              <th key={header} className="border border-gray-300 px-3 py-1 text-center">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(({ word, accuracyScore, errorType, phonemes }, idx) => (
            <tr key={idx} className={errorType !== "None" ? "bg-red-50" : ""}>
              <td className="border border-gray-300 px-3 py-1 font-medium">{word}</td>
              <td className="border border-gray-300 px-3 py-1 text-center">{accuracyScore}</td>
              <td className="border border-gray-300 px-3 py-1 text-center">{errorType}</td>

              {Array.from({ length: maxPhonemes }).map((_, i) => {
                const p = phonemes[i];
                if (!p) return <td key={i} className="border border-gray-300 px-3 py-1"></td>;

                const isLowScore = p.accuracyScore < 50;
                const isErrorType = p.errorType !== "None";

                let className = "px-3 py-1 border border-gray-300 text-center text-gray-600";

                if (isErrorType) {
                  className += " bg-red-200 text-red-800 font-semibold";
                }

                if (isLowScore) {
                  className += " bg-yellow-300 text-yellow-900 font-bold";
                }

                return (
                  <td key={i} className={className} title={`Score: ${p.accuracyScore.toFixed(1)}%, Error: ${p.errorType}`}>
                    {p.phoneme}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

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
                className={`p-2 rounded border ${errorType === "Good"
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

const RecordingPractice = ({ currentQuestion, currentIndex, referenceText, setOnSubmit }) => {
  const API_URL = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`;
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

      const res = await fetch(`${API_URL}/api/score-audio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audio: base64Audio, referenceText, questionId: currentQuestion?.id, index: currentIndex}),
      });

      const data = await res.json();
      if (res.ok) {
        setScoreData(data);
        setStatus("Results received");
        if (setOnSubmit) setOnSubmit(true);
      } else {
        setStatus("Lỗi xảy ra: " + (data.error || "Unknown error"));
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

      {/* Reference text + nút nghe */}
      <div className="mb-6 p-4 bg-blue-50 rounded text-center text-lg font-semibold text-blue-700 select-text flex items-center justify-center gap-2"
        style={{ minHeight: 70, lineHeight: "1.5", whiteSpace: "normal" }}>
        {scoreData?.wordsAssessment?.length > 0 ? (
          <HighlightTextWithTooltip
            text={referenceText}
            wordsAssessment={scoreData.wordsAssessment}
          />
        ) : (
          <span>{referenceText}</span>
        )}
        <TextToSpeechButton text={referenceText} />
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
        <>
          <section className="mt-10 bg-white rounded-lg p-6 shadow-lg max-w-3xl mx-auto">
            <h3 className="text-center text-2xl font-semibold text-blue-800 mb-6 border-b border-blue-300 pb-2 uppercase tracking-wide">
              Test Results
            </h3>

            <div className="text-center mb-6">
              <span className="text-lg font-medium mr-2">Band IELTS:</span>
              <span className="text-3xl font-extrabold text-red-600">
                {scoreData.score ?? "N/A"}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-6 text-center text-gray-800 font-semibold text-lg">
              <div>
                <div className="text-sm text-gray-500 mb-1">Accuracy</div>
                <div>{scoreData.accuracyScore ?? "N/A"}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Fluency</div>
                <div>{scoreData.fluencyScore ?? "N/A"}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Completeness</div>
                <div>{scoreData.completenessScore ?? "N/A"}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Pronunciation</div>
                <div>{scoreData.pronScore ?? "N/A"}</div>
              </div>
            </div>

            <div
              className="mb-8 p-4 bg-gray-50 rounded border border-gray-200 text-gray-700 italic whitespace-pre-wrap text-left leading-relaxed"
              style={{ minHeight: 100 }}
            >
              {scoreData.feedback ?? "No feedback provided."}
            </div>

            <div className="mt-8">
              <PhonemeDetails phonemeDetails={scoreData.phonemeDetails} />
            </div>
          </section>

          {/* Incorrect phonemes table */}
          {scoreData.incorrectPhonemes && scoreData.incorrectPhonemes.length > 0 && (
            <section className="mt-10 max-w-3xl mx-auto">
              <IncorrectPhonemesTable data={scoreData.incorrectPhonemes} />
            </section>
          )}
        </>
      )}

    </section>
  );
};

export default RecordingPractice;