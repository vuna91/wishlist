import * as Joi from '@hapi/joi';
import 'joi-extract-type';

import { ValidatedRequestSchema } from 'express-joi-validation';
import { ContainerTypes } from '../common/containerTypes';
import { createWishValidator, updateWishValidator } from './wish.validator';
import { Optional } from 'sequelize/types';
import { WishItem } from '../wishItem/wishItem.type';

export interface createWishSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Joi.extractType<typeof createWishValidator>;
}

export interface updateWishSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Joi.extractType<typeof updateWishValidator>;
}

export interface Wish {
  id: number;
  title: string;
  userId: number;
}

export type WishCreation = Optional<Wish, 'id'>;

export interface WishWithItem extends Wish {
  items: WishItem[];
}

export type WishUpdate = Optional<Wish, 'id' | 'userId'>;
