import bcryptUtil from '../../common/bcryptUtil';
import jwtUtil from '../../common/jwtUtil';
import userRepository from '../../user/user.repository';
import tokenService from '../token.service';

jest.mock('../../user/user.repository');
jest.mock('../../common/bcryptUtil');

describe('token.service', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createUser', () => {
    const username = '_username';
    const password = '_password';

    it('should generate token correctly', async () => {
      // Given
      (userRepository.getByUsername as jest.Mock).mockResolvedValue({
        id: 1
      });
      (bcryptUtil.isValidPass as jest.Mock).mockResolvedValue(true);
      jest.spyOn(jwtUtil, 'generateToken');

      // When
      await tokenService.generateAccessToken({ username, password });

      // Then
      expect(userRepository.getByUsername).toBeCalledWith(
        username
      );
      expect(jwtUtil.generateToken).toBeCalledWith({ userId: 1 });
    });

    it('should throw error if user is not found', async () => {
      // Given
      (userRepository.getByUsername as jest.Mock).mockResolvedValue(
        null
      );

      // When
      const error = await tokenService
        .generateAccessToken({ username, password })
        .catch((err) => err);

      // Then
      expect(error).toEqual(new Error('Username is invalid'));
    });

    it('should throw error if password is invalid', async () => {
      // Given
      (userRepository.getByUsername as jest.Mock).mockResolvedValue({
        id: 1
      });
      (bcryptUtil.isValidPass as jest.Mock).mockResolvedValue(false);

      // When
      const error = await tokenService
        .generateAccessToken({ username, password })
        .catch((err) => err);

      // Then
      expect(error).toEqual(new Error('Password is invalid'));
    });
  });
});
