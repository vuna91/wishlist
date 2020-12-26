import request from 'supertest';
import app from '../../__jest__/app';
import tokenService from '../token.service';

jest.mock('../token.service');

describe('token.controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /token', () => {
    const username = '_username';
    const password = '_password';

    it('should call token service when input is correct', async () => {
      // Given
      const expectedResult = 'valid token';
      (tokenService.generateAccessToken as jest.Mock).mockResolvedValue(
        expectedResult
      );

      // When
      return request(app)
        .post('/token')
        .send({ username, password })
        .then((res) => {
          // Then
          expect(tokenService.generateAccessToken).toBeCalledWith({
            username,
            password
          });
          expect(res.body).toEqual({ accessToken: expectedResult });
          expect(res.status).toEqual(200);
        });
    });

    it('should return 400 status when input is incorrect', async () => {
      // When
      return request(app)
        .post('/token')
        .send({ username: null, password })
        .then((res) => {
          // Then
          expect(tokenService.generateAccessToken).not.toHaveBeenCalled();
          expect(res.status).toEqual(400);
        });
    });
  });
});
