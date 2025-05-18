const userModel = require('../models/userModel');

// Mock db client
jest.mock('../db', () => ({
  query: jest.fn(),
}));

const client = require('../db');

describe('userModel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findUser', () => {
    it('should query user by username and return result', async () => {
      const fakeResult = { rows: [{ username: 'test', password: 'hash' }] };
      client.query.mockResolvedValue(fakeResult);

      const result = await userModel.findUser('test');
      expect(client.query).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE username = $1',
        ['test']
      );
      expect(result).toBe(fakeResult);
    });
  });

  describe('insertUser', () => {
    it('should insert user with username and hashedPassword', async () => {
      client.query.mockResolvedValue({});

      await userModel.insertUser('test', 'hash');
      expect(client.query).toHaveBeenCalledWith(
        'INSERT INTO users (username, password) VALUES ($1, $2)',
        ['test', 'hash']
      );
    });
  });
});