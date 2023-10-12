const { celebrate, Joi, Segments } = require("celebrate");
const { stringValidationSchema } = require("../user/userSignUp.validator");

const createCategoriesValidation = celebrate(
  {
    [Segments.BODY]: {
      name: stringValidationSchema.required(),
    },
  },
  { abortEarly: false }
);

const updateCategoriesValidation = celebrate(
  {
    [Segments.BODY]: {
      name: stringValidationSchema,
    },
  },
  { abortEarly: false }
);

module.exports = {
  createCategoriesValidation,
  updateCategoriesValidation,
};
