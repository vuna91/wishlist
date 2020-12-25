import { Router } from 'express';
import userRouter from './user/user.controller';

const router = Router();

router.use('/users', userRouter);

export { router };
