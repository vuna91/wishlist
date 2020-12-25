import * as Joi from '@hapi/joi';
import 'joi-extract-type';

import { ValidatedRequestSchema } from 'express-joi-validation';
import { ContainerTypes } from '../common/containerTypes';
import { createUserValidator } from './user.validator';
import { Optional } from 'sequelize/types';

export interface createUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Joi.extractType<typeof createUserValidator>;
}

export interface User {
  id: number;
  username: string;
  password: string;
}

export type UserCreation = Optional<User, 'id'>;
