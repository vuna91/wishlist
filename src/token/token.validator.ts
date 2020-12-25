import * as Joi from '@hapi/joi';

export const getAccessTokenValidator = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});
