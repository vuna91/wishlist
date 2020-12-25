import { Router } from 'express';
import tokenRouter from './token/token.controller';
import userRouter from './user/user.controller';

const router = Router();

router.use('/users', userRouter);
router.use('/token', tokenRouter);

export { router };
