import jwtUtil from '../common/jwtUtil';
import userRepository from '../user/user.repository';
import { LoginInfo } from './token.type';

const generateAccessToken = async (data: LoginInfo): Promise<string> => {
  const user = await userRepository.getByUsernameAndPassword(
    data.username,
    data.password
  );
  if (!user) {
    throw new Error('Username and password are invalid');
  }
  return jwtUtil.generateToken({ userId: user.id });
};

export default {
  generateAccessToken
};
