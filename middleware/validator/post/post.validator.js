const { celebrate, Joi, Segments } = require("celebrate");
const ObjectIDCustomValidator = require("../../../utils/objectIdCustomValidator");
const { stringValidationSchema } = require("../user/userSignUp.validator");

const createPostValidation = celebrate(
  {
    [Segments.BODY]: {
      title: stringValidationSchema.required(),
      description: stringValidationSchema.required(),
      categories: ObjectIDCustomValidator.required(),
    },
  },
  { abortEarly: false }
);

const updatePostValidation = celebrate(
  {
    [Segments.BODY]: {
      title: stringValidationSchema,
      description: stringValidationSchema,
      categories: ObjectIDCustomValidator,
    },
  },
  { abortEarly: false }
);

module.exports = {
  createPostValidation,
  updatePostValidation,
};
