jest.mock('../../models/userModel');
jest.mock('bcrypt');

const { updateUserController } = require('../../controllers/userController');
const { findUserByEmail, findUserByName, updateUser } = require('../../models/userModel');
const bcrypt = require('bcrypt');

describe('Kiểm thử updateUserController', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  it('Trả về lỗi 400 khi tên người dùng đã tồn tại', async () => {
    req.body = { username: 'existingUser' };

    findUserByName.mockResolvedValue({ rows: [{ id: 1 }] });

    await updateUserController(req, res);

    expect(findUserByName).toHaveBeenCalledWith('existingUser');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Username already existed' });
  });

  it('Trả về lỗi 400 khi thiếu email', async () => {
    req.body = { username: 'newUser' };

    findUserByName.mockResolvedValue({ rows: [] });

    await updateUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Missing email' });
  });

  it('Trả về lỗi 404 khi không tìm thấy người dùng qua email', async () => {
    req.body = { username: 'newUser', email: 'abc@xyz.com' };

    findUserByName.mockResolvedValue({ rows: [] });
    findUserByEmail.mockResolvedValue({ rows: [] });

    await updateUserController(req, res);

    expect(findUserByEmail).toHaveBeenCalledWith('abc@xyz.com');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
  });

  it('Trả về lỗi 400 khi đổi mật khẩu mà không nhập mật khẩu hiện tại', async () => {
    req.body = { username: 'newUser', email: 'abc@xyz.com', password: 'newpass' };

    findUserByName.mockResolvedValue({ rows: [] });
    findUserByEmail.mockResolvedValue({ rows: [{ password: 'hashedpass', username: 'oldUser', gender: 'M', nationality: 'VN', phonenumber: '123' }] });

    await updateUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Vui lòng nhập mật khẩu hiện tại' });
  });

  it('Trả về lỗi 401 khi mật khẩu hiện tại không chính xác', async () => {
    req.body = { username: 'newUser', email: 'abc@xyz.com', password: 'newpass', currentPassword: 'wrongpass' };

    findUserByName.mockResolvedValue({ rows: [] });
    findUserByEmail.mockResolvedValue({ rows: [{ password: 'hashedpass', username: 'oldUser', gender: 'M', nationality: 'VN', phonenumber: '123' }] });
    bcrypt.compare.mockResolvedValue(false);

    await updateUserController(req, res);

    expect(bcrypt.compare).toHaveBeenCalledWith('wrongpass', 'hashedpass');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Mật khẩu hiện tại không chính xác' });
  });

  it('Cập nhật mật khẩu mới thành công khi nhập đúng mật khẩu hiện tại', async () => {
    req.body = {
      username: 'newUser',
      email: 'abc@xyz.com',
      password: 'newpass',
      currentPassword: 'correctpass',
      gender: 'F',
      nationality: 'US',
      phoneNumber: '999'
    };

    findUserByName.mockResolvedValue({ rows: [] });
    findUserByEmail.mockResolvedValue({
      rows: [{ password: 'hashedpass', username: 'oldUser', gender: 'M', nationality: 'VN', phonenumber: '123' }]
    });
    bcrypt.compare.mockResolvedValue(true);
    bcrypt.hash.mockResolvedValue('hashednewpass');
    updateUser.mockResolvedValue();

    await updateUserController(req, res);

    expect(bcrypt.compare).toHaveBeenCalledWith('correctpass', 'hashedpass');
    expect(bcrypt.hash).toHaveBeenCalledWith('newpass', 10);
    expect(updateUser).toHaveBeenCalledWith(
      'abc@xyz.com',
      'newUser',
      'hashednewpass',
      'F',
      'US',
      '999'
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
                message: "Cập nhật thành công",
                success: true
     });
  });

  it('Cập nhật thông tin mà không đổi mật khẩu khi không cung cấp mật khẩu mới', async () => {
    req.body = {
      username: 'newUser',
      email: 'abc@xyz.com',
      gender: 'F',
      nationality: 'US',
      phoneNumber: '999'
    };

    findUserByName.mockResolvedValue({ rows: [] });
    findUserByEmail.mockResolvedValue({
      rows: [{ password: 'oldHashedPass', username: 'oldUser', gender: 'M', nationality: 'VN', phonenumber: '123' }]
    });
    updateUser.mockResolvedValue();

    await updateUserController(req, res);

    expect(updateUser).toHaveBeenCalledWith(
      'abc@xyz.com',
      'newUser',
      'oldHashedPass',
      'F',
      'US',
      '999'
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ 
      message: 'Cập nhật thành công',
      success: true
    });
  });

  it('Trả về lỗi 500 khi xảy ra lỗi trong quá trình cập nhật', async () => {
    req.body = {
      username: 'newUser',
      email: 'abc@xyz.com',
    };

    findUserByName.mockResolvedValue({ rows: [] });
    findUserByEmail.mockResolvedValue({
      rows: [{ password: 'oldHashedPass', username: 'oldUser', gender: 'M', nationality: 'VN', phonenumber: '123' }]
    });
    updateUser.mockRejectedValue(new Error('DB error'));

    await updateUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error updating data' });
  });
});
