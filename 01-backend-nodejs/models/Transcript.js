const mongoose = require('mongoose');

const transcriptSchema = new mongoose.Schema({
  transcript: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transcript', transcriptSchema);
