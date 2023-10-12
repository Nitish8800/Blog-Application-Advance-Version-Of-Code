const { celebrate, Joi, Segments } = require("celebrate");
const { passwordValidationSchema } = require("./userSignUp.validator");

const updateSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: passwordValidationSchema,
  confirmPassword: passwordValidationSchema,
});

const updatePasswordValidator = celebrate(
  {
    [Segments.BODY]: updateSchema,
  },
  { abortEarly: false }
);

module.exports = {
  updatePasswordValidator,
};
