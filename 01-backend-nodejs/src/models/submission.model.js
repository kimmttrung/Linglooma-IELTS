import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  totalTests: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 }
});

export default mongoose.model("Record", recordSchema);
