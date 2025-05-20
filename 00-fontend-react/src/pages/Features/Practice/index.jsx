import React, { useState } from "react";
import SpeakingGrid from "./SpeakingGrid";
import RecordingPractice from "./RecordingPractice";

const IeltsSpeakingPractice = () => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [scoreData, setScoreData] = useState(null);

    const IncorrectPhonemesTable = ({ data }) => {
        if (!data || data.length === 0) return null;

        const maxPhonemes = data.reduce(
            (max, item) => Math.max(max, item.phonemes.length),
            0
        );
        const phonemeHeaders = Array.from({ length: maxPhonemes }, (_, i) => `Phoneme ${i + 1}`);

        return (
            <div className="mb-8 bg-white rounded shadow p-4 overflow-x-auto max-w-[1200px] max-h-[900px] border border-red-300">
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

    return (
        <main className="min-h-screen h-screen flex flex-col bg-gradient-to-b from-[#F5F7FA] to-white">
            <div className="flex-1 flex flex-col p-5 gap-6 max-w-[1600px] w-full mx-auto h-full">
                <header className="text-center space-y-2">
                    <h1 className="text-3xl font-extrabold text-slate-600">
                        IELTS 4-Skill Training
                    </h1>
                    <p className="text-base text-zinc-800">
                        Practice your pronunciation by recording yourself reading the passage
                    </p>
                </header>

                <div className="flex flex-col md:flex-row flex-1">
                    {/* Left Side */}
                    <div className="flex flex-col w-full md:w-3/5 gap-5 h-full overflow-y-auto">
                        {/* <SpeechPrompt /> */}
                        <RecordingPractice
                            currentQuestion={currentQuestion}
                            referenceText={currentQuestion?.content || "Chọn một câu hỏi"}
                            onScore={(data) => setScoreData(data)} // callback khi nhận kết quả
                        />
                    </div>

                    {/* Right Side */}
                    <div className="w-full md:w-1/3 h-full">
                        <SpeakingGrid
                            setCurrentQuestion={setCurrentQuestion}
                        />
                    </div>

                </div>
                {/* Results */}
                {scoreData && (
                    <>
                        <section className="mt-10 bg-white rounded-lg p-6 shadow-lg w-full max-w-[1200px] mx-auto">
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
                            <section className="mt-5 max-w-full w-full flex justify-center">
                                <IncorrectPhonemesTable data={scoreData.incorrectPhonemes} />
                            </section>
                        )}
                    </>
                )}
            </div>
        </main>
    );
};

export default IeltsSpeakingPractice;
