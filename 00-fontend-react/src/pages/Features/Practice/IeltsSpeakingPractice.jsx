import React from "react";
import SpeakingGrid from "./SpeakingGrid";
import SpeechPrompt from "./SpeechPrompt";

const IeltsSpeakingPractice = () => {
    return (
        <main className="flex flex-col p-5 bg-[linear-gradient(0deg,#F5F7FA_0%,#F5F7FA_100%),#FFF] min-h-screen">
            <div className="flex flex-col gap-5 items-center mx-auto max-w-[1200px]">
                <header className="flex flex-col gap-2.5 items-center mb-5 w-full text-center">
                    <h1 className="text-3xl font-extrabold leading-10 text-slate-500">
                        IELTS 4-Skill Training
                    </h1>
                    <p className="text-base leading-5 text-zinc-800">
                        Practice your pronunciation by recording yourself reading the passage
                    </p>
                </header>
                <div className="flex gap-5 w-full">
                    <div className="flex flex-col flex-1 gap-5">
                        <SpeechPrompt />
                        {/* <RecordingSection /> */}
                    </div>

                    <SpeakingGrid />

                </div>
            </div>
        </main>
    );
};

export default IeltsSpeakingPractice;
