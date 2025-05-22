const {
  insertLessonResultController,
  getLessonResultController,
  getRecentlyLessonResultController
} = require('../../controllers/lessonResultController');

const {
  insertLessonResult,
  getLessonResult,
  getRecentlyLessonResult
} = require('../../models/lessonResultModel');

jest.mock('../../models/lessonResultModel');

describe('Lesson Result Controllers', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  // ==== insertLessonResultController ====
  describe('insertLessonResultController', () => {
    const validBody = {
      studentId: 'stu1',
      lessonId: 'les1',
      finishedTime: '2025-05-22T10:00:00Z',
      averageScore: 85,
      feedback: 'Good job'
    };

    it('Trả về 400 nếu thiếu tham số bắt buộc', async () => {
      req.body = { ...validBody };
      delete req.body.studentId;

      await insertLessonResultController(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Missing parameters" });
    });

    it('Trả về 201 và kết quả đã insert khi thành công', async () => {
      req.body = validBody;
      const insertedResult = { id: 123, ...validBody };
      insertLessonResult.mockResolvedValue(insertedResult);

      await insertLessonResultController(req, res);

      expect(insertLessonResult).toHaveBeenCalledWith(validBody);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(insertedResult);
    });

    it('Trả về 500 nếu insertLessonResult bị lỗi', async () => {
      req.body = validBody;
      insertLessonResult.mockRejectedValue(new Error('DB error'));

      await insertLessonResultController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error inserting lesson result" });
    });
  });

  // ==== getLessonResultController ====
  describe('getLessonResultController', () => {
    const query = { studentId: 'stu1', lessonId: 'les1' };

    it('Trả về 400 nếu thiếu studentId hoặc lessonId', async () => {
      req.query = { lessonId: 'les1' }; // thiếu studentId

      await getLessonResultController(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Missing parameters" });
    });

    it('Trả về 200 và kết quả bài học khi thành công', async () => {
      req.query = query;
      const results = [{ id: 1, score: 90 }];
      getLessonResult.mockResolvedValue(results);

      await getLessonResultController(req, res);

      expect(getLessonResult).toHaveBeenCalledWith(query.studentId, query.lessonId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(results);
    });

    it('Trả về 500 nếu getLessonResult bị lỗi', async () => {
      req.query = query;
      getLessonResult.mockRejectedValue(new Error('DB error'));

      await getLessonResultController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error fetching lesson result" });
    });
  });

  // ==== getRecentlyLessonResultController ====
  describe('getRecentlyLessonResultController', () => {
    it('Trả về 400 nếu thiếu studentId trong params', async () => {
      req.params = {}; // thiếu studentId

      await getRecentlyLessonResultController(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Missing studentId" });
    });

    it('Trả về 200 và kết quả bài học gần đây khi thành công', async () => {
      req.params = { studentId: 'stu1' };
      const results = [{ id: 1, score: 88 }];
      getRecentlyLessonResult.mockResolvedValue(results);

      await getRecentlyLessonResultController(req, res);

      expect(getRecentlyLessonResult).toHaveBeenCalledWith('stu1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(results);
    });

    it('Trả về 500 nếu getRecentlyLessonResult bị lỗi', async () => {
      req.params = { studentId: 'stu1' };
      getRecentlyLessonResult.mockRejectedValue(new Error('DB error'));

      await getRecentlyLessonResultController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error fetching recent lesson results" });
    });
  });
});