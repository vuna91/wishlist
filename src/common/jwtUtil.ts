import { Request, Response, NextFunction } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { set } from 'lodash';

const SECRET =
  'CA978112CA1BBDCAFAC231B39A23DC4DA786EFF8147C4E72B9807785AFEE48BB';

const generateToken = (data: any) => {
  return sign(data, SECRET, { expiresIn: '1h' });
};

function parserToken(req: Request, _: Response, next: NextFunction): void {
  const rawAccessToken = req.headers.authorization;
  if (rawAccessToken) {
    const parts = rawAccessToken.split(' ');
    if (parts && parts.length === 2) {
      set(req, 'auth', verify(parts[1], SECRET));
    }
  }
  next();
}

export default {
  generateToken,
  parserToken
};
