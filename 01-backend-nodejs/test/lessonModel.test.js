// tests/lessonService.test.js
const { findLesson } = require('../models/lessonModel');

// Mock client.query
jest.mock('../db', () => ({
    query: jest.fn()
}));

const client = require('../db');

describe('findLesson', () => {
    it('should return lesson rows from database', async () => {
        // Mock dữ liệu giả
        const mockLessons = { rows: [{ id: 1, title: 'Lesson 1' }, { id: 2, title: 'Lesson 2' }] };

        // Setup mock trả về
        client.query.mockResolvedValue(mockLessons);

        // Gọi hàm cần test
        const result = await findLesson();

        // Kiểm tra kết quả trả về
        expect(result).toEqual(mockLessons);

        // Đảm bảo hàm query được gọi đúng
        expect(client.query).toHaveBeenCalledWith('SELECT * FROM lesson');
    });
});
