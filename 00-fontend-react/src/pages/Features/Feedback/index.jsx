import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionItem from "./QuestionItem";
import axios from "@/utils/axios.customize";

const PronunciationFeedback = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!lessonId) return;

//     setLoading(true);
//     fetch('http://localhost:5000/api/incorrectphonemes/feedback-summary')
//       // axios.get(`/api/incorrectphonemes/feedback-summary`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch feedback data");
//         // return res.json();
//       })
//       .then((res) => {
//         // Nếu cần, có thể lọc data theo lessonId ở đây nếu backend trả dữ liệu đa bài
//         setQuestions(res);
//         setError(null);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError(err.message || "Unknown error");
//         setQuestions([]);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [lessonId]);

  useEffect(() => {
    if (!lessonId) return;

    const fetchFeedback = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/incorrectphonemes/feedback-summary`);
        setQuestions(Array.isArray(res) ? res : []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err?.error || err.message || "Unknown error");
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [lessonId]);

  if (loading) {
    return (
      <div className="text-center p-5 text-lg text-gray-600">Đang tải dữ liệu...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-5 text-lg text-red-600">Lỗi tải dữ liệu: {error}</div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center p-5 text-lg text-gray-600">Chưa có dữ liệu phản hồi cho bài học này.</div>
    );
  }

  return (
    <section className="mx-auto w-full max-w-none min-w-[779px] max-md:p-2.5 max-md:max-w-[991px] max-md:min-w-[auto] max-sm:max-w-screen-sm">
      <header className="flex justify-between items-center px-1.5 py-3 text-lg font-bold border-b border-solid border-b-black max-sm:flex-wrap max-sm:gap-2.5 mr-24">
        <div className="p-3.5 bg-white rounded max-sm:w-full max-sm:text-center">Question</div>
        <div className="p-3.5 bg-white rounded max-sm:w-full max-sm:text-center">False Words</div>
        <div className="p-3.5 bg-white rounded max-sm:w-full max-sm:text-center mr-48">Score</div>
        <div className="p-3.5 bg-white rounded max-sm:w-full max-sm:text-center">Feedback</div>
        <button
          className="px-5 py-2.5 font-bold bg-sky-400 rounded-[41px] max-sm:w-full max-sm:text-center"
          onClick={() => navigate(`/admin/features/practice/${lessonId}`)}
        >
          Back
        </button>
      </header>
      <div className="p-5">
        {questions.map(({ questionId, topIncorrectPhonemes, averageScores, feedback }) => (
          <QuestionItem
            key={questionId}
            number={questionId}
            falseWords={topIncorrectPhonemes.map(({ phoneme }) => phoneme).join("; ")}
            level={getLevelFromScore(averageScores.ieltsBand)}
            score={averageScores.ieltsBand ? roundToHalf(averageScores.ieltsBand).toFixed(1) : "0.0"}
            feedback={feedback || "Chưa có phản hồi"}
          />
        ))}
      </div>
    </section>
  );
};

function getLevelFromScore(score) {
  if (!score || score <= 0) return "Pending";
  if (score >= 8) return "Proficient";
  if (score >= 6.5) return "Upper Intermediate";
  if (score >= 5) return "Intermediate";
  if (score >= 3) return "Elementary";
  return "Beginner";
}

function roundToHalf(num) {
  return Math.round(num * 2) / 2;
}
export default PronunciationFeedback;
