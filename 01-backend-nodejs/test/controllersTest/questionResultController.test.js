const {
  insertQuestionResultController,
  getQuestionResultOfLessonController,
} = require('../../controllers/questionResultController');

const {
  insertQuestionResult,
  getQuestionResultOfLesson,
} = require('../../models/questionResultModel');

jest.mock('../../models/questionResultModel');

describe('Kiểm thử insertQuestionResultController', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        studentId: 1,
        lessonResultId: 10,
        questionId: 100,
        ieltsBand: 7,
        accuracy: 8,
        fluency: 7,
        completeness: 9,
        pronunciation: 6,
        feedback: 'Làm tốt lắm'
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Chèn kết quả câu hỏi thành công', async () => {
    insertQuestionResult.mockResolvedValue();

    await insertQuestionResultController(req, res);

    expect(insertQuestionResult).toHaveBeenCalledWith(
      1, 10, 100, 7, 8, 7, 9, 6, 'Làm tốt lắm'
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Insert question results successfully" });
  });

  it('Thiếu các trường bắt buộc (studentId) → lỗi 400', async () => {
    req.body.studentId = undefined;

    await insertQuestionResultController(req, res);

    expect(insertQuestionResult).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "All fields are required" });
  });

  it('Lỗi server khi insert → trả về lỗi 500', async () => {
    insertQuestionResult.mockRejectedValue(new Error('Lỗi DB'));

    await insertQuestionResultController(req, res);

    expect(insertQuestionResult).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Insert question results failed" });
  });
});

describe('Kiểm thử getQuestionResultOfLessonController', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        studentId: '1',
        lessonResultId: '10'
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Lấy kết quả câu hỏi thành công', async () => {
    const fakeData = {
      rows: [
        { questionId: 1, ieltsBand: 6.5 },
        { questionId: 2, ieltsBand: 7.0 }
      ]
    };
    getQuestionResultOfLesson.mockResolvedValue(fakeData);

    await getQuestionResultOfLessonController(req, res);

    expect(getQuestionResultOfLesson).toHaveBeenCalledWith('1', '10');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeData.rows);
  });

  it('Thiếu studentId hoặc lessonResultId → lỗi 400', async () => {
    req.params.studentId = undefined;

    await getQuestionResultOfLessonController(req, res);

    expect(getQuestionResultOfLesson).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Missing parameters studentId or lessonResultId"
    });
  });

  it('Lỗi server khi truy vấn → trả về lỗi 500', async () => {
    getQuestionResultOfLesson.mockRejectedValue(new Error('Lỗi DB'));

    await getQuestionResultOfLessonController(req, res);

    expect(getQuestionResultOfLesson).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Get question results failed" });
  });
});
