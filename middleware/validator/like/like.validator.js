const { celebrate, Joi, Segments } = require("celebrate");
const { stringValidationSchema } = require("../user/userSignUp.validator");
const ObjectIDCustomValidator = require("../../../utils/objectIdCustomValidator");

const createReactionValidation = celebrate(
  {
    [Segments.BODY]: {
      reactType: stringValidationSchema.required(),
      postId: ObjectIDCustomValidator.required(),
    },
  },
  { abortEarly: false }
);

module.exports = {
  createReactionValidation,
};
