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

    const rawTable = new Table({
      head: ["Word", "AccuracyScore", "ErrorType", "Phonemes"],
    });
    words.forEach((w) => {
      rawTable.push([
        w.Word || "",
        w.PronunciationAssessment?.AccuracyScore || 0,
        w.PronunciationAssessment?.ErrorType || "None",
        JSON.stringify(
          (w.Phonemes || []).map((p) => ({
            Phoneme: p.Phoneme,
            AccuracyScore: p.PronunciationAssessment?.AccuracyScore || 0,
          }))
        ),
      ]);
    });
    console.log("Raw words from Azure:");
    console.log(rawTable.toString());

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

    const processedTable = new Table({
      head: ["Word", "AccuracyScore", "ErrorType", "IsCorrect", "Phonemes"],
    });
    wordsAssessment.forEach((w) => {
      processedTable.push([
        w.word,
        w.accuracyScore,
        w.errorType,
        w.isCorrect,
        JSON.stringify(
          w.phonemes.map((p) => ({
            Phoneme: p.phoneme,
            AccuracyScore: p.accuracyScore,
            ErrorType: p.errorType,
          }))
        ),
      ]);
    });
    console.log("Processed wordsAssessment:");
    console.log(processedTable.toString());

    // Thêm bảng 3 hàng cho tất cả các từ
    if (wordsAssessment.length > 0) {
      wordsAssessment.forEach((word, index) => {
        const phonemes = word.phonemes || [];

        // Tạo tiêu đề động dựa trên số lượng phonemes
        const headers = [`word[${index}].score`];
        phonemes.forEach((_, i) => headers.push(`phonem[${i}]`));

        const customTable = new Table({
          head: headers,
        });

        // Hàng 1: word[i].score
        const row1 = [word.accuracyScore];
        for (let i = 0; i < phonemes.length; i++) row1.push("");
        customTable.push(row1);

        // Hàng 2: phonemes
        const row2 = [""];
        phonemes.forEach((p) => row2.push(p.phoneme));
        customTable.push(row2);

        // Hàng 3: phoneme scores
        const row3 = [""];
        phonemes.forEach((p) => row3.push(p.accuracyScore));
        customTable.push(row3);

        console.log(`Custom Pronunciation Table for word[${index}]:`);
        console.log(customTable.toString());
      });
    } else {
      console.log("No words available to display in custom table.");
    }

    const phonemeDetails = analyzePhonemes({ wordsAssessment });
    const standardIPA = generateStandardIPA({ wordsAssessment}) || "No standard IPA available";
    const incorrectPhonemes = findIncorrectPhonemes({ wordsAssessment});

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