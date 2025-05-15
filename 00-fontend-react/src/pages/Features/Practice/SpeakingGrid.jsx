import React from "react";
import Button from "@/components/ui/Button";

const GridButton = ({ number, active = false }) => {
    return (
        <div
            className={`text-3xl font-bold aspect-square rounded-[50px] flex items-center justify-center ${active ?
                "bg-slate-500 text-white" : "bg-neutral-300 text-black"
                }`}
        >
            {number}
        </div>
    );
};

const SpeakingGrid = () => {
    return (
        <section className="flex-1 p-5 bg-white rounded-lg shadow-sm">
            <div className="flex flex-col items-center">
                <h2 className="py-1.5 mb-5 text-lg font-extrabold text-sky-800 border-[0.67px] border-zinc-100">
                    Speaking
                </h2>
                <h3 className="mb-5 text-lg font-extrabold text-sky-800">
                    Bài 1 Technology
                </h3>
                <div className="grid grid-cols-3 gap-5 w-full max-w-[400px]">
                    <GridButton number={1} active />
                    {[2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <GridButton key={num} number={num} />
                    ))}
                </div>
                <Button variant="primary" className="mt-5">
                    Exit
                </Button>
            </div>
        </section>
    );
};

export default SpeakingGrid;