import React from 'react';
import ColoredText from './ColorText';
import { useNavigate } from 'react-router-dom';


const PageSubmitRecording = () => {
    const navigate = useNavigate();;

    return (
        <article className="flex flex-col items-center px-5 pt-5 pb-10 bg-white rounded-lg max-w-[442px] shadow-[0px_2px_10px_rgba(0,0,0,0.1)]">
            <header className="z-10 px-16 pt-0 pb-7 w-80 max-w-full text-lg font-extrabold leading-none text-sky-800 border-b bg-black bg-opacity-0 border-zinc-100">
                Result question 1
            </header>

            <section className="flex flex-col items-start mt-10 max-w-full bg-gray-200 rounded-3xl w-[347px]">
                <div className="flex shrink-0 max-w-full bg-green-400 rounded-3xl h-[33px] w-[268px]" />
            </section>

            <ColoredText />

            <section className="flex gap-5 self-start mt-12">
                <div className="flex flex-col my-auto font-bold">
                    <h2 className="self-center text-xl leading-none text-zinc-400">
                        YOUR LEVEL
                    </h2>
                    <p className="mt-5 text-3xl leading-6 text-center text-black">
                        Upper<br />Intermediate
                    </p>
                </div>
                <div className="flex flex-col items-center w-40 h-40 rounded-full border border-solid bg-neutral-400 border-zinc-500">
                    <div className="flex flex-col items-center px-3.5 pb-3.5 w-40 h-40 bg-green-500 rounded-full border border-solid border-zinc-500">
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/d09fa83e4ab04468bd9329558cd49375/78ec2216c33b0befd0782dd1fe0d37fdf3ef0d8c?placeholderIfAbsent=true"
                            alt="Level indicator"
                            className="object-contain rounded-full aspect-[0.9] w-[132px]"
                        />
                    </div>
                </div>
            </section>

            <p className="mt-10 ml-5 text-xl font-bold leading-none text-black">
                powered by Linglooma
            </p>

            <section className="flex gap-5 justify-between mt-10 w-full text-sm font-medium leading-none text-center text-white whitespace-nowrap max-w-[307px]">
                <button
                    className="px-11 py-3 rounded bg-slate-500 hover:bg-slate-600 transition-colors"
                    onClick={() => { }}
                >
                    Retry
                </button>
                <button
                    className="px-8 py-3.5 rounded bg-slate-500 hover:bg-slate-600 transition-colors"
                    onClick={() => { }}
                >
                    Continue
                </button>
            </section>
        </article>
    );
};

export default PageSubmitRecording;
