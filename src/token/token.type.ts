import * as Joi from '@hapi/joi';
import 'joi-extract-type';

import { ValidatedRequestSchema } from 'express-joi-validation';
import { ContainerTypes } from '../common/containerTypes';
import { getAccessTokenValidator } from './token.validator';

export interface getAccessTokenSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Joi.extractType<typeof getAccessTokenValidator>;
}

export interface LoginInfo {
  username: string;
  password: string;
}
