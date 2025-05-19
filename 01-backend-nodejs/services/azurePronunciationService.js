const sdk = require("microsoft-cognitiveservices-speech-sdk");
const fs = require("fs").promises;
const Table = require("cli-table");
require("dotenv").config();

const speechKey = process.env.AZURE_SPEECH_KEY;
const speechRegion = process.env.AZURE_SPEECH_REGION;
const { analyzePhonemes, generateStandardIPA, findIncorrectPhonemes } = require("../utils/analyzePhonemes");

async function assessPronunciation(audioFilePath, referenceText, language = "en-US") {
  try {
    await fs.access(audioFilePath);
  } catch {
    throw new Error("Audio file does not exist");
  }

  const speechConfig = sdk.SpeechConfig.fromSubscription(speechKey, speechRegion);
  speechConfig.speechRecognitionLanguage = language;

  const pronunciationConfig = sdk.PronunciationAssessmentConfig.fromJSON(
    JSON.stringify({
      referenceText,
      gradingSystem: "HundredMark",
      granularity: "Phoneme",
      phonemeAlphabet: "IPA",
    })
  );

  const audioConfig = sdk.AudioConfig.fromWavFileInput(await fs.readFile(audioFilePath));
  const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
  pronunciationConfig.applyTo(recognizer);

  try {
    const result = await new Promise((resolve, reject) => {
      recognizer.recognizeOnceAsync(
        (res) => resolve(res),
        (err) => reject(new Error(`Recognition error: ${err.message}`))
      );
    });

    if (result.reason !== sdk.ResultReason.RecognizedSpeech) {
      throw new Error(`Speech recognition failed: ${result.reason}`);
    }

    let json;
    try {
      json = JSON.parse(result.properties.getProperty(sdk.PropertyId.SpeechServiceResponse_JsonResult));
    } catch (e) {
      throw new Error(`Error parsing JSON result: ${e.message}`);
    }

    const assessment = json.NBest?.[0]?.PronunciationAssessment || { Miscue: [] };
    const transcriptText = result.text || "";
    const words = json.NBest?.[0]?.Words || [];
    const wordsAssessment = words.map((w) => {
      const pronunciation = w.PronunciationAssessment || {};
      const accuracy = pronunciation.AccuracyScore || 0;
      const errorType = pronunciation.ErrorType || "None";
      const isCorrect = errorType === "None" && accuracy >= 50;

      const phonemeDetails = (w.Phonemes || []).map((p) => ({
        phoneme: p.Phoneme || "",
        accuracyScore: p.PronunciationAssessment?.AccuracyScore || 0,
        errorType: p.PronunciationAssessment?.ErrorType || "None",
      }));

      return {
        word: w.Word || "",
        accuracyScore: accuracy,
        errorType,
        isCorrect,
        phonemes: phonemeDetails,
      };
    });

    const phonemeDetails = analyzePhonemes({ wordsAssessment });
    const standardIPA = generateStandardIPA({ wordsAssessment }) || "No standard IPA available";
    const incorrectPhonemes = findIncorrectPhonemes({ wordsAssessment });

    return {
      assessment,
      transcriptText,
      wordsAssessment,
      phonemeDetails,
      standardIPA,
      incorrectPhonemes,
    };
  } finally {
    recognizer.close();
  }
}

module.exports = { assessPronunciation };