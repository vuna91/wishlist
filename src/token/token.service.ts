import bcryptUtil from '../common/bcryptUtil';
import jwtUtil from '../common/jwtUtil';
import userRepository from '../user/user.repository';
import { LoginInfo } from './token.type';

const generateAccessToken = async (data: LoginInfo): Promise<string> => {
  const user = await userRepository.getByUsername(
    data.username
  );
  if (!user) {
    throw new Error('Username is invalid');
  }
  if (!await (bcryptUtil.isValidPass(data.password, user.password))) {
    throw new Error('Password is invalid');
  }
  return jwtUtil.generateToken({ userId: user.id });
};

export default {
  generateAccessToken
};
