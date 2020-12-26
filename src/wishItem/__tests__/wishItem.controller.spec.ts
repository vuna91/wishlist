import request from 'supertest';
import jwtUtil from '../../common/jwtUtil';
import app from '../../__jest__/app';
import wishItemService from '../wishItem.service';

jest.mock('../wishItem.service');

describe('wish.controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const userId = 1;
  const wishId = 123;
  const description = '_description';
  const picture = '_picture';
  const token = `Bearer ${jwtUtil.generateToken({ userId })}`;

  describe('POST /wishes/:wishId/items', () => {
    it('should call service to crete wish item when input is correct', async () => {
      // Given
      const expectedResult = {
        id: 3,
        description,
        picture,
        price: 1234,
        wishId
      };
      const body = {
        description,
        picture,
        price: 1234
      };
      (wishItemService.createWishItem as jest.Mock).mockResolvedValue(
        expectedResult
      );

      // When
      return request(app)
        .post(`/wishes/${wishId}/items`)
        .set({ Authorization: token })
        .send(body)
        .then((res) => {
          // Then
          expect(wishItemService.createWishItem).toBeCalledWith(
            userId,
            wishId,
            body
          );
          expect(res.body).toEqual(expectedResult);
          expect(res.status).toEqual(200);
        });
    });

    it('should return 400 status when input is incorrect', async () => {
      // When
      return request(app)
        .post(`/wishes/${wishId}/items`)
        .set({ Authorization: token })
        .send({})
        .then((res) => {
          // Then
          expect(wishItemService.createWishItem).not.toHaveBeenCalled();
          expect(res.status).toEqual(400);
        });
    });
  });
});
