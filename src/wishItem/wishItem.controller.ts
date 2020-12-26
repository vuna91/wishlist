import { Router, Response } from 'express';
import { ValidatedRequest, createValidator } from 'express-joi-validation';
import { wrapRequestHandler } from '../common/wrapRequestHandler';
import { createWishItemSchema } from './wishItem.type';
import { createItemValidator } from './wishItem.validator';

import jwtUtil from '../common/jwtUtil';
import wishItemService from '../wishItem/wishItem.service';

const wishItemRouter = Router();
const validator = createValidator({ passError: true });

wishItemRouter.post(
  '/:wishId/items',
  validator.body(createItemValidator),
  wrapRequestHandler(
    async (req: ValidatedRequest<createWishItemSchema>, res: Response) => {
      const { userId } = jwtUtil.getAuthInfoFromToken(req);
      const createdWishItem = await wishItemService.createWishItem(
        userId,
        parseInt(req.params.wishId),
        req.body
      );
      res.json(createdWishItem);
    }
  )
);

export default wishItemRouter;
