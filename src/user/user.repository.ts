import { User, UserCreation } from './user.type';
import { UserModel } from './user.model';

const create = async (data: UserCreation): Promise<User> => {
  return await UserModel.create(data);
};

const getByUsername = async (username: string): Promise<User | null> => {
  return await UserModel.findOne({ where: { username } });
};

export default {
  create,
  getByUsername
};
