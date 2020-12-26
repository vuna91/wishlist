import jwtUtil from '../../common/jwtUtil';
import userRepository from '../../user/user.repository';
import tokenService from '../token.service';

jest.mock('../../user/user.repository');

describe('token.service', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createUser', () => {
    const username = '_username';
    const password = '_password';

    it('should generate token correctly', async () => {
      // Given
      (userRepository.getByUsernameAndPassword as jest.Mock).mockResolvedValue({
        id: 1
      });
      jest.spyOn(jwtUtil, 'generateToken');

      // When
      await tokenService.generateAccessToken({ username, password });

      // Then
      expect(userRepository.getByUsernameAndPassword).toBeCalledWith(
        username,
        password
      );
      expect(jwtUtil.generateToken).toBeCalledWith({ userId: 1 });
    });

    it('should throw error if user is not found', async () => {
      // Given
      (userRepository.getByUsernameAndPassword as jest.Mock).mockResolvedValue(
        null
      );

      // When
      const error = await tokenService
        .generateAccessToken({ username, password })
        .catch((err) => err);

      // Then
      expect(error).toEqual(new Error('Username and password are invalid'));
    });
  });
});
