const { findQuestionBasedOnLesson } = require('../models/questionModel');

jest.mock('../db', () => ({
  query: jest.fn()
}));

const client = require('../db');

describe('findQuestionBasedOnLesson', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should query questions by lessonId', async () => {
    const mockResult = { rows: [{ id: 1, lessonId: 5, content: 'Question 1' }] };
    client.query.mockResolvedValueOnce(mockResult);

    const result = await findQuestionBasedOnLesson(5);

    expect(client.query).toHaveBeenCalledWith(
      'SELECT * FROM question WHERE lessonId=$1',
      [5]
    );
    expect(result).toEqual(mockResult);
  });
});
