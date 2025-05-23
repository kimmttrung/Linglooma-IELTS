describe('Kiểm thử giao diện component TextToSpeechButton', () => {
  beforeEach(() => {
    // Mock API trả về câu hỏi cho lessonId = 1
    cy.intercept('GET', '/api/questions/1', {
      statusCode: 200,
      body: [
        {
          id: 1,
          text: "This is a sample question for lesson 1.",
          referenceText: "This is a sample reference text."
        }
      ]
    }).as('getQuestions');

    // Nếu có API lấy lesson, mock luôn
    cy.intercept('GET', '/api/lessons/all', {
      statusCode: 200,
      body: [
        { id: 1, image: '/images/lesson1.png' }
      ]
    }).as('getLessons');

    cy.visit('http://localhost:4028/admin/features/lesson');
    cy.wait('@getLessons');
    cy.wait('@getQuestions');

  });

  it('Hiển thị đúng icon loa và có thể click được', () => {
    cy.get('button[aria-label="Play text to speech"]')
      .should('exist')
      .should('be.visible')
      .and('have.attr', 'title', 'Nghe mẫu giọng đọc');

    cy.get('button[aria-label="Play text to speech"] svg')
      .should('exist')
      .should('have.attr', 'data-icon', 'volume-up'); // Nếu icon có thuộc tính này
  });

  it('Hiển thị alert nếu trình duyệt không hỗ trợ speechSynthesis', () => {
    cy.window().then((win) => {
      // Xóa hỗ trợ speechSynthesis
      delete win.speechSynthesis;
    });

    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('button[aria-label="Play text to speech"]').click().then(() => {
      expect(alertStub).to.have.been.calledWith('Trình duyệt của bạn không hỗ trợ chức năng này.');
    });
  });

  it('Gọi hàm speechSynthesis.speak với văn bản đúng', () => {
    cy.window().then((win) => {
      // Spy speak
      const speakStub = cy.stub(win.speechSynthesis, 'speak').as('speakSpy');

      // Gọi button
      cy.get('button[aria-label="Play text to speech"]').click();

      // Kiểm tra speak được gọi
      cy.get('@speakSpy').should('have.been.calledOnce');

      // Kiểm tra nội dung văn bản được phát
      cy.get('@speakSpy').its('firstCall.args.0.text').should('not.be.empty');
    });
  });

  it('Ưu tiên chọn voice tên chứa "mark" và ngôn ngữ "en-US" nếu có', () => {
    cy.window().then((win) => {
      const voiceList = [
        { name: 'Google UK English Male', lang: 'en-GB' },
        { name: 'Mark Voice', lang: 'en-US' },
        { name: 'Default Voice', lang: 'en-US' }
      ];

      // Giả lập getVoices
      cy.stub(win.speechSynthesis, 'getVoices').returns(voiceList);

      const speakStub = cy.stub(win.speechSynthesis, 'speak').as('speakSpy');
      cy.get('button[aria-label="Play text to speech"]').click();

      cy.get('@speakSpy').should('have.been.calledOnce');
      cy.get('@speakSpy')
        .its('firstCall.args.0.voice.name')
        .should('eq', 'Mark Voice');
    });
  });

  it('Fallback về voice tiếng Anh nếu không có "mark"', () => {
    cy.window().then((win) => {
      const voiceList = [
        { name: 'Google UK English Male', lang: 'en-GB' },
        { name: 'Default Voice', lang: 'en-US' }
      ];

      cy.stub(win.speechSynthesis, 'getVoices').returns(voiceList);

      const speakStub = cy.stub(win.speechSynthesis, 'speak').as('speakSpy');
      cy.get('button[aria-label="Play text to speech"]').click();

      cy.get('@speakSpy').should('have.been.calledOnce');
      cy.get('@speakSpy')
        .its('firstCall.args.0.voice.lang')
        .should('eq', 'en-US');
    });
  });

  it('Fallback về voice đầu tiên nếu không có voice en-US', () => {
    cy.window().then((win) => {
      const voiceList = [
        { name: 'Japanese Voice', lang: 'ja-JP' },
        { name: 'French Voice', lang: 'fr-FR' }
      ];

      cy.stub(win.speechSynthesis, 'getVoices').returns(voiceList);

      const speakStub = cy.stub(win.speechSynthesis, 'speak').as('speakSpy');
      cy.get('button[aria-label="Play text to speech"]').click();

      cy.get('@speakSpy').should('have.been.calledOnce');
      cy.get('@speakSpy')
        .its('firstCall.args.0.voice.lang')
        .should('eq', 'ja-JP');
    });
  });
});
