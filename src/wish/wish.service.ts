import wishRepository from './wish.repository';
import { Wish, WishCreation, WishUpdate, WishWithItem } from './wish.type';

const createWish = async (data: WishCreation): Promise<Wish> => {
  return await wishRepository.create(data);
};

const getWishDetail = async (
  userId: number,
  wishId: number
): Promise<WishWithItem> => {
  const wishDetail = await wishRepository.getDetail(userId, wishId);
  if (!wishDetail) {
    throw new Error('Wishlist is not found');
  }
  return wishDetail;
};

const getAll = async (userId: number): Promise<Wish[]> => {
  return await wishRepository.getAll(userId);
};

const updateWish = async (
  userId: number,
  wishId: number,
  data: WishUpdate
): Promise<void> => {
  await getWishDetail(userId, wishId);
  await wishRepository.update(userId, wishId, data);
};

export default {
  createWish,
  getWishDetail,
  getAll,
  updateWish
};
