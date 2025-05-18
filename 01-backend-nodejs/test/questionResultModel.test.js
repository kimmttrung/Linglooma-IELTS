const {
  insertQuestionResult,
  getQuestionResultOfLesson
} = require('../models/questionResultModel');  

jest.mock('../db', () => ({
  query: jest.fn()
}));

const client = require('../db');

describe('questionResultService', () => {
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('insertQuestionResult', () => {
    it('should call client.query with correct SQL and parameters', async () => {
      client.query.mockResolvedValueOnce();

      await insertQuestionResult(10, 20, 95, '', 1);

      expect(client.query).toHaveBeenCalledWith(
        `
        INSERT INTO questionResult (lessonResultId, questionId, score, errorPronouce, studentId)
        VALUES ($1, $2, $3, $4, $5)
        `,
        [10, 20, 95, '', 1]
      );
    });
  });

  describe('getQuestionResultOfLesson', () => {
    it('should return query result with join between questionResult and lessonResult', async () => {
      const mockResult = { rows: [{ lessonResultId: 10, questionId: 20, score: 95 }] };
      client.query.mockResolvedValueOnce(mockResult);

      const result = await getQuestionResultOfLesson(1, 10);

      expect(client.query).toHaveBeenCalledWith(
        `
        SELECT * 
        FROM questionResult qr
        INNER JOIN lessonResult lr 
        ON lr.id = qr.lessonResultId AND qr.studentId = lr.studentId
        WHERE qr.studentId=$1 AND qr.lessonResultId=$2;
        `,
        [1, 10]
      );
      expect(result).toEqual(mockResult);
    });
  });
});
