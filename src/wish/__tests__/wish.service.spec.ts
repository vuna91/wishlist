import wishRepository from '../wish.repository';
import wishService from '../wish.service';

jest.mock('../wish.repository');

describe('wish.service', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const userId = 1;
  const wishId = 123;
  const title = 'wish of user 1';

  describe('createWish', () => {
    it('should create wish if input is correct', async () => {
      // Given
      const expectedResult = {
        id: 4,
        title,
        userId
      };
      (wishRepository.create as jest.Mock).mockResolvedValue(expectedResult);

      // When
      const createdWish = await wishService.createWish({ title, userId });

      // Then
      expect(wishRepository.create).toBeCalledWith({ title, userId });
      expect(createdWish).toEqual(expectedResult);
    });
  });

  describe('getWishDetail', () => {
    it('should get wish details correctly', async () => {
      // Given
      const expectedResult = {
        id: 3,
        title: 'wish of user 1',
        userId,
        items: [
          {
            id: 3,
            description: '_description',
            picture: '_picture',
            price: 1234,
            wishId: 3
          }
        ]
      };
      (wishRepository.getDetail as jest.Mock).mockResolvedValue(expectedResult);

      // When
      const wishDetail = await wishService.getWishDetail(userId, wishId);

      // Then
      expect(wishRepository.getDetail).toBeCalledWith(userId, wishId);
      expect(wishDetail).toEqual(expectedResult);
    });

    it('should throw error if wish is not found', async () => {
      // Given
      (wishRepository.getDetail as jest.Mock).mockResolvedValue(null);

      // When
      const error = await wishService
        .getWishDetail(userId, wishId)
        .catch((err) => err);

      // Then
      expect(error).toEqual(new Error('Wishlist is not found'));
    });
  });

  describe('getAll', () => {
    it('should get all wishlists correctly', async () => {
      // Given
      (wishRepository.getAll as jest.Mock).mockResolvedValue([]);

      // When
      const wishlists = await wishService.getAll(userId);

      // Then
      expect(wishRepository.getAll).toBeCalledWith(userId);
      expect(wishlists).toEqual([]);
    });
  });

  describe('updateWish', () => {
    it('should update wishlist correctly', async () => {
      // Given
      const data = { title: 'updated title' };
      (wishRepository.getDetail as jest.Mock).mockResolvedValue({});

      // When
      await wishService.updateWish(userId, wishId, data);

      // Then
      expect(wishRepository.getDetail).toBeCalledWith(userId, wishId);
      expect(wishRepository.update).toBeCalledWith(userId, wishId, data);
    });

    it('should throw error is wishlist is not found', async () => {
      // Given
      const data = { title: 'updated title' };
      (wishRepository.getDetail as jest.Mock).mockResolvedValue(null);

      // When
      const error = await wishService
        .updateWish(userId, wishId, data)
        .catch((err) => err);

      // Then
      expect(error).toEqual(new Error('Wishlist is not found'));
    });
  });
});
