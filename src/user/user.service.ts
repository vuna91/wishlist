import { User, UserCreation } from './user.type';

import userRepository from './user.repository';
import bcryptUtil from '../common/bcryptUtil';

const createUser = async (data: UserCreation): Promise<User> => {
  const user = await userRepository.getByUsername(data.username);
  if (user) {
    throw new Error('User is existed');
  }

  return await userRepository.create({ ...data, password: await bcryptUtil.hashPass(data.password) });
};

export default {
  createUser
};
