import React from "react";
import CourseCard from "./CourseCard";
import { useNavigate } from "react-router-dom";

const LessonSpeaking = () => {
    const navigate = useNavigate();

    return (
        <main className="ml-5 w-[98%] max-md:ml-0 max-md:w-full">
            <div className="overflow-hidden grow w-full h-[907px] min-h-[796px] min-w-80 max-md:mt-9 max-md:max-w-full">
                <section className="pt-5 pr-20 pb-11 pl-2.5 w-full bg-white max-md:pr-5 max-md:max-w-full">
                    <div className="flex flex-col py-1.5 pr-10 w-full max-md:pr-5 max-md:max-w-full">
                        <div className="w-full max-md:max-w-full">
                            <div className="flex gap-5 max-md:flex-col">
                                <div className="w-[70%] max-md:ml-0 max-md:w-full">
                                    <div className="grow max-md:mt-10 max-md:max-w-full">
                                        <div className="flex gap-5 max-md:flex-col">
                                            <div className="w-[18%] max-md:ml-0 max-md:w-full">
                                                <button
                                                    className="px-8 py-3.5 mt-1.5 w-full text-sm font-medium leading-none text-center text-white whitespace-nowrap rounded bg-slate-500 max-md:px-5 max-md:mt-6"
                                                    onClick={() => navigate("/admin/features")}
                                                >
                                                    EXit
                                                </button>
                                            </div>
                                            <div className="ml-5 w-[899px] max-md:ml-0 max-md:w-full">
                                                <CourseCard title="Bài 1 Technology" imageUrl="https://cdn.builder.io/api/v1/image/assets/d09fa83e4ab04468bd9329558cd49375/02a90a0b65e66df0963f1b5477527d2ac1445187?placeholderIfAbsent=true" />
                                            </div>
                                            <div className="ml-5 w-[899px] max-md:ml-0 max-md:w-full">
                                                <CourseCard title="Bài 2 Environment" imageUrl="https://cdn.builder.io/api/v1/image/assets/d09fa83e4ab04468bd9329558cd49375/1236d1d71bbeb3c3824f8ab88eb5159654b5e4d1?placeholderIfAbsent=true" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="self-start mt-10 max-w-full w-[899px]">
                            <div className="flex gap-5 max-md:flex-col">
                                <div className="w-6/12 max-md:ml-0 max-md:w-full">
                                    <CourseCard title="Bài 3 Education" imageUrl="https://cdn.builder.io/api/v1/image/assets/d09fa83e4ab04468bd9329558cd49375/50ce905aa9a969e7683a8822bd451ce918855619?placeholderIfAbsent=true" />
                                </div>
                                <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-ful ">
                                    <CourseCard title="Bài 4 Health" imageUrl="https://cdn.builder.io/api/v1/image/assets/d09fa83e4ab04468bd9329558cd49375/ddc2f9e7faf4c399e595e15ab3f987f8785f338f?placeholderIfAbsent=true" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <img src="https://cdn.builder.io/api/v1/image/assets/d09fa83e4ab04468bd9329558cd49375/80372bba8ffda745246c090a3e569e57d87e4beb?placeholderIfAbsent=true" className="object-contain max-w-full w-[397px]" alt="" />
            </div>
        </main>
    );
};

export default LessonSpeaking;
