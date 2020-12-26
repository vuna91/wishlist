import { Router } from 'express';

import tokenRouter from './token/token.controller';
import userRouter from './user/user.controller';
import wishRouter from './wish/wish.controller';
import wishItemRouter from './wishItem/wishItem.controller';

const router = Router();

router.use('/users', userRouter);
router.use('/token', tokenRouter);
router.use('/wishes', [wishRouter, wishItemRouter]);

export { router };
