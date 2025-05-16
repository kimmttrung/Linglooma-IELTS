import Button from "@/components/ui/Button";
import React from "react";
import { FaMicrophone } from "react-icons/fa6";
// import { useNavigate } from "react-router-dom";


const RecordingPractice = ({ setOnSubmit }) => {
    // const navigate = useNavigate();

    const handleSubmit = () => {
        // Gọi API / xử lý ghi âm xong rồi...
        console.log("Submit clicked");
        setOnSubmit(true);
    };

    return (
        <section className="p-5 bg-white rounded-lg shadow-sm h-[360px]">
            <div className="flex flex-col items-center">
                <h2 className="py-1.5 mb-5 text-lg font-extrabold text-sky-800 border-[0.67px] border-zinc-100">
                    Recording
                </h2>
                <div className="flex flex-col gap-5 items-center">
                    <p className="text-base font-extrabold text-black">00:00</p>
                    <button className="flex justify-center items-center w-20 h-20 shadow-sm bg-slate-500 rounded-[50px]">
                        <FaMicrophone size={40} color="white" />
                    </button>
                    <div className="flex gap-2.5">
                        <Button variant="secondary">Stop</Button>
                        <Button variant="secondary">Play</Button>
                        {/* <button
                            variant="primary"
                            onClick={handleSubmit}
                        >Submit</button> */}
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default RecordingPractice;
