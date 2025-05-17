import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { number } from "prop-types";

const GridButton = ({ number, active, onClick }) => {
    return (
        <div
            onClick={() => onClick(number)}
            className={`text-3xl font-bold aspect-square rounded-[50px] flex items-center justify-center ${active ?
                "bg-slate-500 text-white" : "bg-neutral-300 text-black"
                }`}
        >
            {number}
        </div>
    );
};

const SpeakingGrid = ({ setCurrentQuestion }) => {
    const navigate = useNavigate();
    const [activeNumber, setActiveNumber] = useState(1);
    const [questions, setQuestions] = useState([]);

    const handleClick = (index) => {
        setActiveNumber(index + 1); // để button active đúng
        const question = questions[index];
        if (question) setCurrentQuestion(question);
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/questions/1`);
                const data = await res.json();
                console.log(">>> data", data);

                if (data.questions && Array.isArray(data.questions)) {
                    setQuestions(data.questions);
                    if (data.questions.length > 0) {
                        setCurrentQuestion(data.questions[0]);
                    }
                } else {
                    console.error("Dữ liệu không hợp lệ:", data);
                    setQuestions([]);
                }
            } catch (err) {
                console.error("Lỗi fetch API:", err);
                setQuestions([]);
            }
        };
        fetchQuestions();
    }, [setCurrentQuestion]);


    return (
        <section className="flex-1 p-5 bg-white rounded-lg shadow-sm h-[700px]">
            <div className="flex flex-col items-center gap-10">
                <h2 className="py-1.5 mb-5 text-lg font-extrabold text-sky-800 border-[0.67px] border-zinc-100">
                    Speaking
                </h2>
                <h3 className="mb-5 text-lg font-extrabold text-sky-800">
                    Bài 1 Technology
                </h3>
                <div className="grid grid-cols-3 gap-5 w-full max-w-[400px]">
                    {questions.map((q, idx) => (
                        <GridButton
                            key={q.id}
                            number={idx + 1}
                            active={activeNumber === (idx + 1)}
                            onClick={() => handleClick(idx)} // truyền đúng index
                        />
                    ))}
                </div>
                <Button variant="primary" className="mt-5" onClick={() => navigate("/admin/features/lesson")}>
                    Exit
                </Button>
            </div>
        </section>
    );
};

export default SpeakingGrid;