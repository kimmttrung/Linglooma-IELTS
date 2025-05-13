import mongoose from "mongoose";

const readingSubmissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  testId: { type: String, required: true }, // ID bài test
  answers: [{ questionId: String, answer: String }],
  score: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model("ReadingSubmission", readingSubmissionSchema);
