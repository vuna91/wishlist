import { createWishSchema, updateWishSchema } from './wish.type';
import { Router, Response, Request } from 'express';
import { ValidatedRequest, createValidator } from 'express-joi-validation';
import { createWishValidator, updateWishValidator } from './wish.validator';
import { wrapRequestHandler } from '../common/wrapRequestHandler';

import jwtUtil from '../common/jwtUtil';
import wishService from './wish.service';

const wishRouter = Router();
const validator = createValidator({ passError: true });

wishRouter.post(
  '/',
  validator.body(createWishValidator),
  wrapRequestHandler(
    async (req: ValidatedRequest<createWishSchema>, res: Response) => {
      const { userId } = jwtUtil.getAuthInfoFromToken(req);
      const createdWish = await wishService.createWish({ ...req.body, userId });
      res.json(createdWish);
    }
  )
);

wishRouter.get(
  '/:wishId',
  wrapRequestHandler(async (req: Request, res: Response) => {
    const { userId } = jwtUtil.getAuthInfoFromToken(req);
    const wishDetail = await wishService.getWishDetail(
      userId,
      parseInt(req.params.wishId)
    );
    res.json(wishDetail);
  })
);

wishRouter.get(
  '/',
  wrapRequestHandler(async (req: Request, res: Response) => {
    const { userId } = jwtUtil.getAuthInfoFromToken(req);
    const wishes = await wishService.getAll(userId);
    res.json({ data: wishes });
  })
);

wishRouter.put(
  '/:wishId',
  validator.body(updateWishValidator),
  wrapRequestHandler(
    async (req: ValidatedRequest<updateWishSchema>, res: Response) => {
      const { userId } = jwtUtil.getAuthInfoFromToken(req);
      await wishService.updateWish(
        userId,
        parseInt(req.params.wishId),
        req.body
      );
      res.json({ success: true });
    }
  )
);

export default wishRouter;
