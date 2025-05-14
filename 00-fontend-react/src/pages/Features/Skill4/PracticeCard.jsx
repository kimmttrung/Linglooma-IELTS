import React from "react";

export const PracticeCard = ({ title, description }) => {
    return (
        <article className="flex flex-col grow items-center px-12 pt-4 w-full bg-white rounded-lg shadow-[0px_2px_10px_rgba(0,0,0,0.1)] max-md:px-5 max-md:mt-10">
            <header className="pb-5 max-w-full text-lg font-extrabold leading-none text-sky-800 border-b border-zinc-100 w-[166px]">
                {title}
            </header>
            <p className="overflow-hidden self-stretch px-2.5 pt-2.5 pb-14 mt-5 text-base leading-6 rounded bg-slate-100 text-zinc-800">
                {description}
            </p>
            <button className="px-14 py-3.5 mt-5 max-w-full text-sm font-bold leading-none text-center text-white whitespace-nowrap rounded bg-slate-500 w-[151px] max-md:px-5">
                LEARN
            </button>
            <div className="flex shrink-0 h-[23px] w-[151px]" />
        </article>
    );
};