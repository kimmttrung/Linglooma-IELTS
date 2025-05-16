import Button from "@/components/ui/Button";
import React from "react";


const SpeechPrompt = () => {
  return (
    <div className="p-5 bg-white rounded-lg shadow-sm h-[300px]">
      <div className="flex flex-col items-center">
        <h2 className="py-1.5 mb-5 text-lg font-extrabold text-sky-800 border-[0.67px] border-zinc-100">
          Speech Prompt
        </h2>
        <p className="p-2.5 mb-5 w-full text-base leading-6 rounded bg-slate-100 text-zinc-800">
          The quick brown fox jumps over the lazy dog. Pack my box with five dozen
          liquor jugs. How vexingly quick daft zebras jump! Bright vixens jump;
          dozy fowl quack. Sphinx of black quartz, judge my vow.
        </p>
        <div className="flex gap-8">
          <Button variant="primary">Previous</Button>
          <Button variant="secondary">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default SpeechPrompt;
