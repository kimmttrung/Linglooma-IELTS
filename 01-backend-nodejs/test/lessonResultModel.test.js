const {
  insertLessonResult,
  getLessonResult,
  getRecentlyLessonResult
} = require('../models/lessonResultModel');

// Mock db module
jest.mock('../db', () => ({
  query: jest.fn()
}));

const client = require('../db');

describe('lessonResultService', () => {

  afterEach(() => {
    jest.clearAllMocks(); // reset mock sau mỗi test
  });

  describe('insertLessonResult', () => {
    it('should insert a new lesson result into the database', async () => {
      client.query.mockResolvedValueOnce(); // Không cần trả về gì

      await insertLessonResult(1, 2, '2025-05-16 10:00', 85, 'Great job');

      expect(client.query).toHaveBeenCalledWith(
        `INSERT INTO lessonResult (studentId, lessonId, finishedTime, averageScore, feedback) 
        VALUES ($1, $2, $3, $4, $5)`,
        [1, 2, '2025-05-16 10:00', 85, 'Great job']
      );
    });
  });

  describe('getLessonResult', () => {
    it('should return the lesson result for given student and lesson', async () => {
      const mockResult = { rows: [{ id: 1, studentId: 1, lessonId: 2 }] };
      client.query.mockResolvedValueOnce(mockResult);

      const result = await getLessonResult(1, 2);

      expect(client.query).toHaveBeenCalledWith(
        'SELECT * FROM lessonResult WHERE studentId=$1 AND lessonId=$2',
        [1, 2]
      );
      expect(result).toEqual(mockResult);
    });
  });

  describe('getRecentlyLessonResult', () => {
    it('should return the 7 most recent lesson results for a student', async () => {
      const mockResult = {
        rows: [
          { id: 1, finishedTime: '2025-05-15' },
          { id: 1, finishedTime: '2025-05-14' }
        ]
      };

        const mockData = {
        rows: [
          { id: 1, finishedTime: '2025-05-14' },
          { id: 1, finishedTime: '2025-05-15' }
        ]
      };

      client.query.mockResolvedValueOnce(mockData);

      const result = await getRecentlyLessonResult(1);

      expect(client.query).toHaveBeenCalledWith(
        `
        SELECT * 
        FROM lessonresult
        WHERE studentId=$1
        ORDER BY finishedTime DESC
        LIMIT 7;
        `,
        [1]
      );
      expect(result).toEqual(mockResult);
    });
  });

});
