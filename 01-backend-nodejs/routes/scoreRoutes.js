const express = require("express");
const router = express.Router();

const { scoreAudio } = require("../controllers/scoreController");

router.post("/score-audio", scoreAudio);

module.exports = router;

