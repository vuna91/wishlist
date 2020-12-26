import bcryptUtil from '../../common/bcryptUtil';
import userRepository from '../user.repository';
import userService from '../user.service';

jest.mock('../user.repository');
jest.mock('../../common/bcryptUtil');

describe('user.service', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createUser', () => {
    const username = '_username';
    const password = '_password';

    it('should create user if input is correct', async () => {
      // Given
      const expectedResult = {
        id: 1,
        username,
        password
      };
      (userRepository.getByUsername as jest.Mock).mockResolvedValue(null);
      (userRepository.create as jest.Mock).mockResolvedValue(expectedResult);
      (bcryptUtil.hashPass as jest.Mock).mockResolvedValue('_hash');

      // When
      const createdUser = await userService.createUser({ username, password });

      // Then
      expect(userRepository.getByUsername).toBeCalledWith(username);
      expect(userRepository.create).toBeCalledWith({ username, password: '_hash' });
      expect(createdUser).toEqual(expectedResult);
    });

    it('should throw error if username is existed', async () => {
      // Given
      (userRepository.getByUsername as jest.Mock).mockResolvedValue({});

      // When
      const error = await userService
        .createUser({ username, password })
        .catch((err) => err);

      // Then
      expect(error).toEqual(new Error('User is existed'));
    });
  });
});
