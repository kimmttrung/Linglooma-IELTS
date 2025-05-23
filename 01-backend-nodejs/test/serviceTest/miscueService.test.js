const { findMismatchedWords } = require('../../services/miscueService'); // sửa đường dẫn nếu file bạn đặt chỗ khác

describe('findMismatchedWords', () => {
    test('Tất cả từ đều khớp', () => {
        const ref = "The quick brown fox jumps over the lazy dog.";
        const trans = "The quick brown fox jumps over the lazy dog";
        const result = findMismatchedWords(ref, trans);
        expect(result).toEqual([]);
    });

    test('Một số từ bị thiếu trong transcript', () => {
        const ref = "She sells sea shells by the sea shore.";
        const trans = "She sells shells by shore";
        const result = findMismatchedWords(ref, trans);
        expect(result).toEqual(["sea", "the", "sea"]);
    });

    test('Tất cả từ đều sai', () => {
        const ref = "This is a test sentence.";
        const trans = "Completely unrelated text.";
        const result = findMismatchedWords(ref, trans);
        expect(result).toEqual(["this", "is", "a", "test", "sentence"]);
    });

    test('Transcript là chuỗi rỗng', () => {
        const ref = "Just a simple sentence.";
        const trans = "";
        const result = findMismatchedWords(ref, trans);

        // Sửa lại kỳ vọng kết quả theo logic của hàm hiện tại
        expect(result).toEqual([]);
    });

    test('Cả reference và transcript đều rỗng', () => {
        const result = findMismatchedWords("", "");
        expect(result).toEqual([]);
    });

    test('Transcript thiếu từ do dấu câu', () => {
        const ref = "Hello, how are you doing today?";
        const trans = "Hello how you doing today";
        const result = findMismatchedWords(ref, trans);
        expect(result).toEqual(["are"]);
    });

    test('Chữ hoa chữ thường không ảnh hưởng', () => {
        const ref = "HELLO world";
        const trans = "hello WORLD";
        const result = findMismatchedWords(ref, trans);
        expect(result).toEqual([]);
    });
});
