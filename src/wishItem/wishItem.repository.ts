import { WishItemModel } from './wishItem.model';
import { WishItem, WishItemCreation } from './wishItem.type';

const create = async (data: WishItemCreation): Promise<WishItem> => {
  return await WishItemModel.create(data);
};

export default {
  create
};
