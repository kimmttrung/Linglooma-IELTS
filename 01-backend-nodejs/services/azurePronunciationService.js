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

  return new Promise((resolve, reject) => {
    pronunciationConfig.applyTo(recognizer);

    recognizer.recognizeOnceAsync(
      (result) => {
        if (result.reason === sdk.ResultReason.RecognizedSpeech) {
          try {
            const json = JSON.parse(
              result.properties.getProperty(sdk.PropertyId.SpeechServiceResponse_JsonResult)
            );

            resolve(json.NBest[0].PronunciationAssessment);
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
