describe('Kiểm thử giao diện trang Dashboard', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4028/admin/dashboard');
    });

    it('Hiển thị lịch Calendar đúng giao diện cho tháng 5', () => {
    // Kiểm tra tháng và năm
    cy.contains('May 2025').should('exist');

    // Kiểm tra các thứ trong tuần
    const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    daysOfWeek.forEach((day) => {
        cy.contains(day).should('exist');
    });

    // Kiểm tra có đủ 31 ngày
    for (let i = 1; i <= 31; i++) {
        cy.contains('button', i.toString()).should('exist');
    }
    });


});