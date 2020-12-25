import request from 'supertest';
import app from '../../__jest__/app';
import userService from '../user.service';

jest.mock('../user.service');

describe('user.controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /users', () => {
    const username = '_username';
    const password = '_password';

    it('should call service when input is correct', async () => {
      // Given
      const expectedResult = {
        id: 1,
        username,
        password
      };
      (userService.createUser as jest.Mock).mockResolvedValue(expectedResult);

      // When
      return request(app)
        .post('/users')
        .send({ username, password })
        .then((res) => {
          // Then
          expect(userService.createUser).toBeCalledWith({
            username,
            password
          });
          expect(res.body.data).toEqual(expectedResult);
          expect(res.status).toEqual(200);
        });
    });

    it('should return 400 status when input is incorrect', async () => {
      // When
      return request(app)
        .post('/users')
        .send({ username: null, password })
        .then((res) => {
          // Then
          expect(userService.createUser).not.toHaveBeenCalled();
          expect(res.status).toEqual(400);
        });
    });
  });
});
