const { calculateIELTSBand } = require('../../services/ieltsScoringService'); // Cập nhật đúng đường dẫn

describe('calculateIELTSBand', () => {
    test('Trường hợp điểm cao (90-100)', () => {
        const input = {
            AccuracyScore: 95,
            FluencyScore: 90,
            CompletenessScore: 100,
            PronScore: 92,
        };
        const result = calculateIELTSBand(input);
        expect(result.band).toBeGreaterThanOrEqual(8);
        expect(result.totalScore).toBeDefined();
        expect(result.feedback).toMatch(/Lưu loát|Phát âm|Lời khuyên/);
    });

    test('Trường hợp điểm trung bình (65-75)', () => {
        const input = {
            AccuracyScore: 70,
            FluencyScore: 65,
            CompletenessScore: 75,
            PronScore: 68,
        };
        const result = calculateIELTSBand(input);
        expect(result.band).toBeGreaterThanOrEqual(6);
        expect(result.band).toBeLessThanOrEqual(7);
        expect(result.feedback).toContain('Lưu loát và mạch lạc');
    });

    test('Trường hợp điểm thấp (30-40)', () => {
        const input = {
            AccuracyScore: 40,
            FluencyScore: 35,
            CompletenessScore: 30,
            PronScore: 38,
        };
        const result = calculateIELTSBand(input);
        expect(result.band).toBeLessThanOrEqual(5);
        expect(result.feedback).toMatch(/Lỗi phát âm|ngắt quãng/);
    });

    test('Trường hợp không có điểm nào (tất cả là 0)', () => {
        const input = {};
        const result = calculateIELTSBand(input);
        expect(result.band).toBe(0);
        expect(result.totalScore).toBe("0.00");
        expect(result.feedback).toMatch(/Lỗi phát âm|cấu trúc đơn giản/);
    });
});
