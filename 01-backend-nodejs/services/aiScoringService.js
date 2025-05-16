const fetch = require('node-fetch');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "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";

async function scoreTranscript(transcript) {
  const prompt = `
Bạn là chuyên gia chấm điểm tiếng Anh nói. Đánh giá đoạn văn sau và trả về đúng định dạng JSON:

{
  "score": (điểm số nguyên từ 0 đến 100),
  "feedback": "(phản hồi chi tiết ngắn gọn)"
}

Đoạn văn: "${transcript}"
`;

  const body = {
    model: "gpt-4o-mini", // model OpenRouter hỗ trợ, giống OpenAI
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  };

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API lỗi: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  const responseText = data.choices[0].message.content.trim();

  try {
    const json = JSON.parse(responseText);
    return {
      score: json.score,
      feedback: json.feedback,
    };
  } catch (e) {
    return {
      score: 0,
      feedback: 'Không thể đánh giá, vui lòng thử lại.',
    };
  }
}

module.exports = { scoreTranscript };
