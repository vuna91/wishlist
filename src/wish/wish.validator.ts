import * as Joi from '@hapi/joi';

export const createWishValidator = Joi.object({
  title: Joi.string().required()
});

export const updateWishValidator = Joi.object({
  title: Joi.string().required()
});
