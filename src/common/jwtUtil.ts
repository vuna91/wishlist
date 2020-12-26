import { Request, Response, NextFunction } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { get, set } from 'lodash';
import { AUTHENTICATION } from '../token/token.constant';

const SECRET =
  'CA978112CA1BBDCAFAC231B39A23DC4DA786EFF8147C4E72B9807785AFEE48BB';

const generateToken = (data: any): string => {
  return sign(data, SECRET, { expiresIn: '1h' });
};

function parserToken(req: Request, _: Response, next: NextFunction): void {
  const rawAccessToken = req.headers.authorization;
  if (rawAccessToken) {
    const parts = rawAccessToken.split(' ');
    if (parts && parts.length === 2) {
      set(req, AUTHENTICATION, verify(parts[1], SECRET));
    }
  }
  next();
}

const getAuthInfoFromToken = (req: Request): { userId: number } => {
  const auth = get(req, AUTHENTICATION);
  if (!auth) {
    throw new Error('Auth info is not found');
  }
  return auth;
};

export default {
  generateToken,
  parserToken,
  getAuthInfoFromToken
};
