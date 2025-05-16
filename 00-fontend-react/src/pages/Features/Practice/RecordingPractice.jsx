import Button from "@/components/ui/Button";
import React from "react";
import { FaMicrophone } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

// const RecordingIcon = () => (
//     <svg
//         width="40"
//         height="40"
//         viewBox="0 0 40 40"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         className="w-[40px] h-[40px]"
//     >
//         <path
//             d="M19.9999 3.3335C21.326 3.3335 22.5978 3.86028 23.5355 4.79796C24.4731 5.73564 24.9999 7.00741 24.9999 8.3335V18.3335C24.9999 19.6596 24.4731 20.9313 23.5355 21.869C22.5978 22.8067 21.326 23.3335 19.9999 23.3335C18.6738 23.3335 17.4021 22.8067 16.4644 21.869C15.5267 20.9313 14.9999 19.6596 14.9999 18.3335V8.3335C14.9999 7.00741 15.5267 5.73564 16.4644 4.79796C17.4021 3.86028 18.6738 3.3335 19.9999 3.3335ZM31.6666 18.3335C31.6666 24.2168 27.3166 29.0668 21.6666 29.8835V35.0002H18.3333V29.8835C12.6833 29.0668 8.33325 24.2168 8.33325 18.3335H11.6666C11.6666 20.5436 12.5446 22.6632 14.1074 24.2261C15.6702 25.7889 17.7898 26.6668 19.9999 26.6668C22.2101 26.6668 24.3297 25.7889 25.8925 24.2261C27.4553 22.6632 28.3333 20.5436 28.3333 18.3335H31.6666Z"
//             fill="white"
//         />
//     </svg>
// );

const RecordingPractice = () => {
    const navigate = useNavigate();

    return (
        <section className="p-5 bg-white rounded-lg shadow-sm h-[360px]">
            <div className="flex flex-col items-center">
                <h2 className="py-1.5 mb-5 text-lg font-extrabold text-sky-800 border-[0.67px] border-zinc-100">
                    Recording
                </h2>
                <div className="flex flex-col gap-5 items-center">
                    <p className="text-base font-extrabold text-black">00:00</p>
                    <button className="flex justify-center items-center w-20 h-20 shadow-sm bg-slate-500 rounded-[50px]">
                        {/* <MicrophoneIcon /> */}
                        <FaMicrophone size={40} color="white" />
                    </button>
                    <div className="flex gap-2.5">
                        <Button variant="secondary">Stop</Button>
                        <Button variant="secondary">Play</Button>
                        <Button variant="primary" onClick={() => navigate("/admin/features/submit")}>Submit</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default RecordingPractice;
