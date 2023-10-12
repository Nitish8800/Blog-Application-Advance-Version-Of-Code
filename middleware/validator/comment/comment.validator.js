const { celebrate, Joi, Segments } = require("celebrate");
const { stringValidationSchema } = require("../user/userSignUp.validator");
const ObjectIDCustomValidator = require("../../../utils/objectIdCustomValidator");

const createCommentsValidation = celebrate(
  {
    [Segments.BODY]: {
      comment: stringValidationSchema.required(),
      postId: ObjectIDCustomValidator.required(),
    },
  },
  { abortEarly: false }
);

const updateCommentValidation = celebrate(
  {
    [Segments.BODY]: {
      comment: stringValidationSchema,
      postId: ObjectIDCustomValidator,
    },
  },
  { abortEarly: false }
);

module.exports = {
  createCommentsValidation,
  updateCommentValidation,
};
