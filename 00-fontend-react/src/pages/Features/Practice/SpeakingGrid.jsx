import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";

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
    const API_URL = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`;

    const navigate = useNavigate();
    const { lessonId } = useParams();

    const [activeNumber, setActiveNumber] = useState(1);
    const [questions, setQuestions] = useState([]);
    const [lessonTitle, setLessonTitle] = useState("");

    const handleClick = (index) => {
        setActiveNumber(index + 1);
        const question = questions[index];
        if (question) {
            setCurrentQuestion(question);
        }
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch(`${API_URL}/api/${lessonId}`);
                const data = await res.json();

                if (data.questions && Array.isArray(data.questions)) {
                    setQuestions(data.questions);
                    if (data.questions.length > 0) {
                        setCurrentQuestion(data.questions[0]);
                        setLessonTitle(data.questions[0].name); // ✅ Set title
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
    }, [lessonId, setCurrentQuestion]);

    return (
        <section className="flex-1 p-5 bg-white rounded-lg shadow-sm h-[700px]">
            <div className="flex flex-col items-center gap-10">
                <h2 className="py-1.5 mb-5 text-lg font-extrabold text-sky-800 border-[0.67px] border-zinc-100">
                    Speaking
                </h2>
                <h3 className="mb-5 text-lg font-extrabold text-sky-800">
                    Bài {lessonId} {lessonTitle}
                </h3>
                <div className="grid grid-cols-3 gap-5 w-full max-w-[400px]">
                    {questions.map((q, index) => (
                        <GridButton
                            key={index}
                            number={index + 1}
                            active={activeNumber === (index + 1)}
                            onClick={() => handleClick(index)}
                        />
                    ))}
                </div>
                <div className="flex  gap-10">
                    <Button variant="primary" className="mt-5" onClick={() => navigate(`/admin/features/feedback/${lessonId}`)}>
                        Feedback
                    </Button>
                    <Button variant="primary" className="mt-5" onClick={() => navigate("/admin/features/lesson")}>
                        Exit
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default SpeakingGrid;
