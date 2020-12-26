import wishRepository from '../../wish/wish.repository';
import wishItemRepository from '../wishItem.repository';
import wishItemService from '../wishItem.service';

jest.mock('../../wish/wish.repository');
jest.mock('../wishItem.repository');

describe('wishItem.service', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const userId = 1;
  const wishId = 123;
  const data = {
    description: '_description',
    picture: '_picture',
    price: 1234
  };

  describe('createWishItem', () => {
    it('should create wish item correctly', async () => {
      // Given
      (wishRepository.getByIdAndUser as jest.Mock).mockResolvedValue({});
      (wishItemRepository.create as jest.Mock).mockResolvedValue({});

      // When
      const createdWishItem = await wishItemService.createWishItem(
        userId,
        wishId,
        data
      );

      // Then
      expect(wishRepository.getByIdAndUser).toBeCalledWith(wishId, userId);
      expect(wishItemRepository.create).toBeCalledWith({ ...data, wishId });
      expect(createdWishItem).toEqual({});
    });

    it('should throw error if wish is not found', async () => {
      // Given
      (wishRepository.getByIdAndUser as jest.Mock).mockResolvedValue(null);

      // When
      const error = await wishItemService
        .createWishItem(userId, wishId, data)
        .catch((err) => err);

      // Then
      expect(error).toEqual(new Error('Wishlist is not found'));
    });
  });
});
