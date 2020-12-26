import * as Joi from '@hapi/joi';

export const createItemValidator = Joi.object({
  description: Joi.string().required(),
  picture: Joi.string().required(),
  price: Joi.number().required()
});
