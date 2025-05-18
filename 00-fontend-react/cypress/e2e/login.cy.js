describe('Trang đăng nhập - PageLogin', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4028/login'); // Thay đổi nếu bạn dùng port khác
  });

  it('Hiển thị giao diện đăng nhập', () => {
    cy.contains('Linglooma').should('exist');
    cy.get('input[placeholder="Email address"]').should('exist');
    cy.get('input[placeholder="Password"]').should('exist');
    cy.contains('Login').should('exist');
  });

  it('Hiển thị lỗi nếu không nhập email hoặc mật khẩu', () => {
    cy.contains('Login').click();
    cy.contains('Invlid email').should('exist');

    cy.get('input[placeholder="Email address"]').type('test@example.com');
    cy.contains('Login').click();
    cy.contains('Invalid password').should('exist');
  });

  it('Đăng nhập thành công với thông tin đúng (mocked API)', () => {
    cy.intercept('POST', '**/api/login', {
      statusCode: 200,
      body: {
        success: true,
        user: { id: 1, name: 'Admin' }
      }
    }).as('loginRequest');

    cy.get('input[placeholder="Email address"]').type('test@example.com');
    cy.get('input[placeholder="Password"]').type('123456');
    cy.contains('Login').click();

    cy.wait('@loginRequest');
    cy.contains('Login Success').should('exist');
  });

  it('Hiển thị lỗi khi thông tin không đúng (mocked API)', () => {
    cy.intercept('POST', '**/api/login', {
      statusCode: 401,
      body: { msg: 'Sai tài khoản hoặc mật khẩu' }
    }).as('loginFail');

    cy.get('input[placeholder="Email address"]').type('wrong@example.com');
    cy.get('input[placeholder="Password"]').type('wrongpass');
    cy.contains('Login').click();

    cy.wait('@loginFail');
    cy.contains('Sai tài khoản hoặc mật khẩu').should('exist');
  });
});
