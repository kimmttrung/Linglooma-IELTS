import React, { useState } from "react";
import SpeakingGrid from "./SpeakingGrid";
import SpeechPrompt from "./SpeechPrompt";
import RecordingPractice from "./RecordingPractice";
import PageSubmitRecording from "./PageSubmitRecording";

const IeltsSpeakingPractice = () => {
    const [onSubmit, setOnSubmit] = useState(false);
    // setOnSubmit(false);

    return (
        <main className="min-h-screen h-screen flex flex-col bg-gradient-to-b from-[#F5F7FA] to-white">
            <div className="flex-1 flex flex-col p-5 gap-6 max-w-6xl w-full mx-auto h-full">
                <header className="text-center space-y-2">
                    <h1 className="text-3xl font-extrabold text-slate-600">
                        IELTS 4-Skill Training
                    </h1>
                    <p className="text-base text-zinc-800">
                        Practice your pronunciation by recording yourself reading the passage
                    </p>
                </header>

                <div className="flex flex-col md:flex-row gap-6 flex-1">
                    {/* Left Side */}
                    <div className="flex flex-col w-full md:w-2/3 gap-10">
                        <SpeechPrompt />
                        <RecordingPractice />
                    </div>

                    {/* Right Side */}
                    <div className="w-full md:w-1/3 h-full">
                        {onSubmit === true ? <PageSubmitRecording /> : <SpeakingGrid />}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default IeltsSpeakingPractice;
