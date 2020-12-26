import wishRepository from '../wish/wish.repository';
import wishItemRepository from './wishItem.repository';
import { WishItem, WishItemCreation } from './wishItem.type';

const createWishItem = async (
  userId: number,
  wishId: number,
  data: WishItemCreation
): Promise<WishItem> => {
  const wish = await wishRepository.getByIdAndUser(wishId, userId);
  if (!wish) {
    throw new Error('Wishlist is not found');
  }
  return await wishItemRepository.create({ ...data, wishId });
};

export default {
  createWishItem
};
