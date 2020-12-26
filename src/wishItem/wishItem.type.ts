import * as Joi from '@hapi/joi';
import 'joi-extract-type';

import { ValidatedRequestSchema } from 'express-joi-validation';
import { ContainerTypes } from '../common/containerTypes';
import { Optional } from 'sequelize/types';
import { createItemValidator } from './wishItem.validator';

export interface createWishItemSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Joi.extractType<typeof createItemValidator>;
}

export interface WishItem {
  id: number;
  description: string;
  picture: string;
  price: number;
  wishId: number;
}

export type WishItemCreation = Optional<WishItem, 'id' | 'wishId'>;
