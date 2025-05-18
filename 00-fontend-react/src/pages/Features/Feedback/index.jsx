// import FeedbackHeader from './FeedbackHeader';

import { useNavigate, useParams } from "react-router-dom";
import QuestionItem from "./QuestionItem";


const questions = [
    {
        number: 1,
        falseWords: "vexingly /ˈvɛk.sɪŋ.li/; fowl /faʊl/; Sphinx /sfɪŋks/ lazy /ˈleɪ.zi/; dog /dɒɡ/; movement /ˈmuːv.mənt/",
        level: "Upper Intermediate",
        score: 80,
        feedback: "Đọc từng từ chậm rãi – chia thành những âm nhỏ hơn – lặp lại từng phần – sau đó kết hợp tất cả lại"
    },
    {
        number: 2,
        falseWords: "jeopardize /ˈdʒep.ə.daɪz/; keep /kiːp/; bought /bɔːt/; enemy /ˈen.ə.mi/",
        level: "Intermediate",
        score: 70,
        feedback: "Cần chú ý phát âm những âm cuối và âm gió."
    },
    {
        number: 3,
        falseWords: "scalable /ˈskeɪ.lə.bəl/; architecture /ˈɑː.kɪ.tek.tʃər/",
        level: "Advanced",
        score: 90,
        feedback: "Có thể do giao tiếp hàng ngày đã thành thói quen nên nhấn trọng âm có chỗ chưa chuẩn"
    },
    {
        number: 4,
        falseWords: "No false words",
        level: "Pending",
        score: 0,
        feedback: "Chưa có kết quả"
    },
    {
        number: 5,
        falseWords: "No false words",
        level: "Pending",
        score: 0,
        feedback: "Chưa có kết quả"
    },
    {
        number: 6,
        falseWords: "No false words",
        level: "Pending",
        score: 0,
        feedback: "Chưa có kết quả"
    },
    {
        number: 7,
        falseWords: "No false words",
        level: "Pending",
        score: 0,
        feedback: "Chưa có kết quả"
    },
    {
        number: 8,
        falseWords: "No false words",
        level: "Pending",
        score: 0,
        feedback: "Chưa có kết quả"
    },
    {
        number: 9,
        falseWords: "No false words",
        level: "Proficient",
        score: 100,
        feedback: "Rất tốt! Hãy phát huy nhé!"
    }
];

const PronunciationFeedback = () => {
    const navigate = useNavigate();
    const { lessonId } = useParams();

    return (
        <section className="mx-auto w-full max-w-none min-w-[779px] max-md:p-2.5 max-md:max-w-[991px] max-md:min-w-[auto] max-sm:max-w-screen-sm">
            <header className="flex justify-between items-center px-1.5 py-3 text-lg font-bold border-b border-solid border-b-black max-sm:flex-wrap max-sm:gap-2.5 mr-24">
                <div className="p-3.5 bg-white rounded max-sm:w-full max-sm:text-center">
                    Question
                </div>
                <div className="p-3.5 bg-white rounded max-sm:w-full max-sm:text-center">
                    False Words
                </div>
                <div className="p-3.5 bg-white rounded max-sm:w-full max-sm:text-cente mr-48">
                    Score
                </div>
                <div className="p-3.5 bg-white rounded max-sm:w-full max-sm:text-center">
                    Feedback
                </div>
                <button
                    className="px-5 py-2.5 font-bold bg-sky-400 rounded-[41px] max-sm:w-full max-sm:text-center"
                    onClick={() => navigate(`/admin/features/practice/${lessonId}`)}
                >
                    Back
                </button>
            </header>
            <div className="p-5">
                {questions.map((question) => (
                    <QuestionItem
                        key={question.number}
                        number={question.number}
                        falseWords={question.falseWords}
                        level={question.level}
                        score={question.score}
                        feedback={question.feedback}
                    />
                ))}
            </div>
        </section>
    );
};

export default PronunciationFeedback;
