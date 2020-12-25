import { Router, Response } from 'express';
import { ValidatedRequest, createValidator } from 'express-joi-validation';
import { wrapRequestHandler } from '../common/wrapRequestHandler';
import { getAccessTokenSchema } from './token.type';
import { getAccessTokenValidator } from './token.validator';

import tokenService from './token.service';

const tokenRouter = Router();
const validator = createValidator({ passError: true });

tokenRouter.post(
  '/',
  validator.body(getAccessTokenValidator),
  wrapRequestHandler(
    async (req: ValidatedRequest<getAccessTokenSchema>, res: Response) => {
      const accessToken = await tokenService.generateAccessToken(req.body);
      res.json({ accessToken });
    }
  )
);

export default tokenRouter;
