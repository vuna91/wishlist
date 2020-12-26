import { WishModel } from './wish.model';
import { Wish, WishCreation, WishUpdate, WishWithItem } from './wish.type';

const create = async (data: WishCreation): Promise<Wish> => {
  return await WishModel.create(data);
};

const getByIdAndUser = async (
  userId: number,
  wishId: number
): Promise<Wish | null> => {
  return await WishModel.findOne({ where: { id: wishId, userId } });
};

const getDetail = async (
  userId: number,
  wishId: number
): Promise<WishWithItem | null> => {
  return await WishModel.findOne({
    where: { id: wishId, userId },
    include: [WishModel.associations.items]
  });
};

const getAll = async (userId: number): Promise<Wish[]> => {
  return await WishModel.findAll({
    where: { userId }
  });
};

const update = async (
  userId: number,
  wishId: number,
  data: WishUpdate
): Promise<void> => {
  await WishModel.update(
    {
      title: data.title
    },
    {
      where: { userId, id: wishId }
    }
  );
};

export default {
  create,
  getByIdAndUser,
  getDetail,
  getAll,
  update
};
