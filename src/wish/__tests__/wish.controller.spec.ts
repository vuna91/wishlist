import request from 'supertest';
import jwtUtil from '../../common/jwtUtil';
import app from '../../__jest__/app';
import wishService from '../wish.service';

jest.mock('../wish.service');

describe('wish.controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const userId = 1;
  const token = `Bearer ${jwtUtil.generateToken({ userId })}`;

  describe('POST /wishes', () => {
    it('should call service to crete wish when input is correct', async () => {
      // Given
      const expectedResult = {
        id: 1,
        title: 'wish list 1',
        userId: 3
      };
      (wishService.createWish as jest.Mock).mockResolvedValue(expectedResult);

      // When
      return request(app)
        .post('/wishes')
        .set({ Authorization: token })
        .send({ title: '_title' })
        .then((res) => {
          // Then
          expect(wishService.createWish).toBeCalledWith({
            title: '_title',
            userId
          });
          expect(res.body).toEqual(expectedResult);
          expect(res.status).toEqual(200);
        });
    });

    it('should return 400 status when input is incorrect', async () => {
      // When
      return request(app)
        .post('/wishes')
        .set({ Authorization: token })
        .send({ title: null })
        .then((res) => {
          // Then
          expect(wishService.createWish).not.toHaveBeenCalled();
          expect(res.status).toEqual(400);
        });
    });
  });

  describe('GET /wishes/:wishId', () => {
    it('should call service to get wish details when input is correct', async () => {
      // Given
      const expectedResult = {
        id: 3,
        title: 'wish of user 3',
        userId: 3,
        items: [
          {
            id: 3,
            description: 'description_2',
            picture: 'picture_2',
            price: 1234,
            wishId: 3
          }
        ]
      };
      (wishService.getWishDetail as jest.Mock).mockResolvedValue(
        expectedResult
      );

      // When
      return request(app)
        .get('/wishes/123')
        .set({ Authorization: token })
        .then((res) => {
          // Then
          expect(wishService.getWishDetail).toBeCalledWith(userId, 123);
          expect(res.body).toEqual(expectedResult);
          expect(res.status).toEqual(200);
        });
    });
  });

  describe('GET /wishes', () => {
    it('should call service to get all wishes when input is correct', async () => {
      // Given
      (wishService.getAll as jest.Mock).mockResolvedValue([]);

      // When
      return request(app)
        .get('/wishes')
        .set({ Authorization: token })
        .then((res) => {
          // Then
          expect(wishService.getAll).toBeCalledWith(userId);
          expect(res.body).toEqual({ data: [] });
          expect(res.status).toEqual(200);
        });
    });
  });

  describe('PUT /wishes/:wishId', () => {
    it('should call service to update wish when input is correct', async () => {
      // When
      return request(app)
        .put('/wishes/123')
        .set({ Authorization: token })
        .send({ title: 'updated title' })
        .then((res) => {
          // Then
          expect(wishService.updateWish).toBeCalledWith(userId, 123, {
            title: 'updated title'
          });
          expect(res.status).toEqual(200);
        });
    });

    it('should return 400 status when input is incorrect', async () => {
      // When
      return request(app)
        .put('/wishes/123')
        .set({ Authorization: token })
        .send({ title: null })
        .then((res) => {
          // Then
          expect(wishService.updateWish).not.toHaveBeenCalled();
          expect(res.status).toEqual(400);
        });
    });
  });
});
