const express = require("express");
const router = express.Router();

const { scoreAudio } = require("../controllers/scoreController");
// const jwtauth = require("../middleware/jwtauth");

// router.all("*", jwtauth);
router.post("/score-audio", scoreAudio);

module.exports = router;

