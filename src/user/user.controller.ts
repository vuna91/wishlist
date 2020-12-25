import { createUserSchema } from './user.type';
import { Router, Response } from 'express';
import { ValidatedRequest, createValidator } from 'express-joi-validation';
import { createUserValidator } from './user.validator';
import { wrapRequestHandler } from '../common/wrapRequestHandler';

import userService from './user.service';

const userRouter = Router();
const validator = createValidator({ passError: true });

userRouter.post(
  '/',
  validator.body(createUserValidator),
  wrapRequestHandler(
    async (req: ValidatedRequest<createUserSchema>, res: Response) => {
      const createdUser = await userService.createUser(req.body);
      res.json(createdUser);
    }
  )
);

export default userRouter;
