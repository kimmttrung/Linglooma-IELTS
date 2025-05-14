import React from "react";
import { PracticeCard } from "./PracticeCard";
import Skill4Header from "./Skill4Header";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/pages/Admin/Sidebar";

const Skill4 = () => {
    const navigate = useNavigate();

    return (
        <main className="overflow-hidden bg-white">
            <div className="flex max-md:flex-col h-screen">
                <section className="ml-5 w-[90%] max-md:ml-0 max-md:w-full">
                    <div className="overflow-hidden grow w-full min-h-[1300px] min-w-80 max-md:mt-9 max-md:max-w-full">
                        <div className="flex flex-col py-6 pr-20 pl-5 w-full bg-white max-md:pr-5 max-md:max-w-full">
                            <Skill4Header />
                            <div className="self-end px-10 pt-2 pb-6 mt-6 max-w-full w-[1177px] max-md:px-5">
                                <div className="max-md:max-w-full">
                                    <div className="flex gap-20 max-md:flex-col">
                                        <div className="w-6/12 max-md:ml-0 max-md:w-full">
                                            <PracticeCard
                                                title="Listening Practice"
                                                description="Listen to various IELTS-style recordings and answer questions that test your understanding, vocabulary, and focus under time pressure."
                                            />
                                        </div>
                                        <div
                                            className="ml-5 w-6/12 max-md:ml-0 max-md:w-full"
                                            onClick={() => navigate("/admin/lesson")}
                                        >
                                            <PracticeCard
                                                title="Speaking Practice"
                                                description="Listen to various IELTS-style recordings and answer questions that test your understanding, vocabulary, and focus under time pressure."
                                            />
                                        </div>

                                    </div>
                                </div>

                                <div className="mt-20 max-md:mt-10 max-md:max-w-full">
                                    <div className="flex gap-20 max-md:flex-col">
                                        <div className="w-6/12 max-md:ml-0 max-md:w-full">
                                            <PracticeCard
                                                title="Reading Practice"
                                                description="Listen to various IELTS-style recordings and answer questions that test your understanding, vocabulary, and focus under time pressure."
                                            />
                                        </div>
                                        <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                                            <PracticeCard
                                                title="Writing Practice"
                                                description="Listen to various IELTS-style recordings and answer questions that test your understanding, vocabulary, and focus under time pressure."
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Skill4;
