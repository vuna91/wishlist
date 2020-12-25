import * as Joi from '@hapi/joi';

export const createUserValidator = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});
