import { Router, Response, Request } from 'express';

const userRouter = Router();

userRouter.get('/', (_req: Request, res: Response) => {
  res.json({ data: 'hello' });
});

export default userRouter;
