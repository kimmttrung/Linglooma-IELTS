const sdk = require("microsoft-cognitiveservices-speech-sdk");
const fs = require("fs");
require('dotenv').config();

const speechKey = process.env.AZURE_SPEECH_KEY;
const speechRegion = process.env.AZURE_SPEECH_REGION;

async function assessPronunciation(audioFilePath, referenceText) {
  const speechConfig = sdk.SpeechConfig.fromSubscription(speechKey, speechRegion);
  speechConfig.speechRecognitionLanguage = "en-US";

  const pronunciationConfig = new sdk.PronunciationAssessmentConfig(
    referenceText,
    sdk.PronunciationAssessmentGradingSystem.HundredMark,
    sdk.PronunciationAssessmentGranularity.Phoneme,
    true
  );

  const audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync(audioFilePath));

  const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

  pronunciationConfig.applyTo(recognizer);

  return new Promise((resolve, reject) => {
    recognizer.recognizeOnceAsync(
      (result) => {
        if (result.reason === sdk.ResultReason.RecognizedSpeech) {
          try {
            const jsonString = result.properties.getProperty(sdk.PropertyId.SpeechServiceResponse_JsonResult);
            const json = JSON.parse(jsonString);

            const assessment = json.NBest[0].PronunciationAssessment;
            if (!assessment.Miscue) assessment.Miscue = [];

            const transcriptText = result.text;

            // Lấy mảng từ và đánh giá từng từ
            const words = json.NBest[0].Words || [];

            const wordsAssessment = words.map((w) => {
              const accuracy = w.PronunciationAssessment?.AccuracyScore ?? 0;
              const errorType = w.PronunciationAssessment?.ErrorType ?? "None";

              const isCorrect = (errorType === "None" && accuracy >= 50);

              return {
                word: w.Word,
                accuracyScore: accuracy,
                errorType,
                isCorrect,
              };
            });

            resolve({
              assessment,
              transcriptText,
              wordsAssessment,
            });
          } catch (e) {
            reject(e);
          }
        } else {
          reject(new Error("Không nhận dạng được giọng nói"));
        }
      },
      (err) => {
        reject(err);
      }
    );
  });
}

module.exports = { assessPronunciation };