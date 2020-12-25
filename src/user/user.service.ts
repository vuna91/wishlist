import { User, UserCreation } from './user.type';

import userRepository from './user.repository';

const createUser = async (data: UserCreation): Promise<User> => {
  const user = await userRepository.getByUsername(data.username);
  if (user) {
    throw new Error('User is existed');
  }
  return userRepository.create(data);
};

export default {
  createUser
};
