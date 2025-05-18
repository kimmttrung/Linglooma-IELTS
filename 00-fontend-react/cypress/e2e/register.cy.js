describe('Trang Đăng ký tài khoản', () => {
  const email = 'nguoidung@example.com';
  const password = 'matkhau123';

  beforeEach(() => {
    cy.visit('http://localhost:4028/register');
  });

  it('Hiển thị đầy đủ các ô nhập và nút đăng ký', () => {
    cy.get('input[placeholder="Email address"]').should('exist');
    cy.get('input[placeholder="Password"]').should('exist');
    cy.get('input[placeholder="Confirm Password"]').should('exist');
    cy.contains('Create new account').should('exist');
  });

  it('Thông báo lỗi khi chưa nhập đầy đủ thông tin', () => {
    cy.contains('Create new account').click();
    cy.contains('Please fill in all fields').should('exist');
  });

  it('Thông báo lỗi khi mật khẩu và xác nhận không khớp', () => {
    cy.get('input[placeholder="Email address"]').type(email);
    cy.get('input[placeholder="Password"]').type(password);
    cy.get('input[placeholder="Confirm Password"]').type('khonggionhau');
    cy.contains('Create new account').click();
    cy.contains('Passwords do not match').should('exist');
  });

  it('Gửi API và đăng ký thành công', () => {
    // Giả lập phản hồi thành công từ backend
    cy.intercept('POST', '**/api/register', {
      statusCode: 200,
      body: { success: true },
    }).as('registerSuccess');

    cy.get('input[placeholder="Email address"]').type(email);
    cy.get('input[placeholder="Password"]').type(password);
    cy.get('input[placeholder="Confirm Password"]').type(password);

    cy.contains('Create new account').click();
    cy.wait('@registerSuccess');

    cy.contains('Register success').should('exist');
  });

  it('Xử lý lỗi khi backend trả về lỗi (VD: Email đã tồn tại)', () => {
    cy.intercept('POST', '**/api/register', {
      statusCode: 400,
      body: { msg: 'Email already exists' },
    }).as('registerFail');

    cy.get('input[placeholder="Email address"]').type(email);
    cy.get('input[placeholder="Password"]').type(password);
    cy.get('input[placeholder="Confirm Password"]').type(password);

    cy.contains('Create new account').click();
    cy.wait('@registerFail');

    cy.contains('Email already exists').should('exist');
  });
});
