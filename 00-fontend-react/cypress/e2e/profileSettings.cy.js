// đang lỗi 3 test 

describe('👤 ProfileSettingsForm', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/users/account', {
      statusCode: 200,
      body: {
        success: true,
        user: {
          username: 'testuser',
          email: 'test@example.com',
          gender: 'male',
          nationality: 'Vietnamese',
          phonenumber: '0123456789'
        }
      }
    }).as('getAccount');
    cy.loginUI && cy.loginUI();
    cy.visit('/admin/settings');
  });

  it('🧩 Hiển thị đầy đủ các trường thông tin cá nhân', () => {
    cy.reload();
    cy.wait('@getAccount');
    cy.get('input#fullName', { timeout: 10000 }).should('have.value', 'testuser');
    cy.get('form').first().within(() => {
      cy.get('label').contains('Full Name').should('exist');
      cy.get('input#fullName').should('exist').and('be.disabled').and('have.value', 'testuser');
      cy.get('label').contains('Gender').should('exist');
      cy.get('input#gender-profile').should('exist').and('be.disabled').and('have.value', 'male');
      cy.get('label').contains('Nationality').should('exist');
      cy.get('input#language').should('exist').and('be.disabled').and('have.value', 'Vietnamese');
      cy.get('label').contains('Phone number').should('exist');
      cy.get('input#phonenumber-profile').should('exist').and('be.disabled').and('have.value', '0123456789');
    });
  });

  it('🖼️ Hiển thị đúng avatar và thông tin user', () => {
    cy.reload();
    cy.get('form').first().within(() => {
      cy.get('img[alt="Profile"]').should('have.attr', 'src', '/images/Profile1.png');
      cy.contains('h2.font-semibold', 'testuser').should('exist');
      cy.contains('p.text-gray-600', 'test@example.com').should('exist');
    });
  });

  it('🔗 Hiển thị và kiểm tra các liên kết mạng xã hội', () => {
    cy.get('form').first().within(() => {
      cy.get('a[href*="facebook.com"]').should('exist').find('img[alt="Facebook"]');
      cy.get('a[href*="instagram.com"]').should('exist').find('img[alt="Instagram"]');
      cy.get('a[href*="linkedin.com"]').should('exist').find('img[alt="LinkedIn"]');
      cy.get('a[href*="x.com"]').should('exist').find('img[alt="Twitter"]');
    });
  });

  it('📧 Hiển thị đúng email và thời gian', () => {
    cy.get('form').first().within(() => {
      cy.get('label').contains('My email Address').should('exist');
      cy.get('span').contains('test@example.com').should('exist');
      cy.get('span').contains('1 month ago').should('exist');
    });
  });

  it('➕ Nút Add Email Address hiển thị và có icon', () => {
    cy.get('form').first().within(() => {
      cy.get('button').contains('Add Email Address').should('exist');
      cy.get('button').contains('Add Email Address').find('svg').should('exist');
    });
  });

  it('🛑 Các trường input đều bị disabled', () => {
    cy.get('form').first().within(() => {
      cy.get('input').each($input => {
        cy.wrap($input).should('be.disabled');
      });
    });
  });
});