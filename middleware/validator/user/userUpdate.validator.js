const { celebrate, Joi, Segments } = require("celebrate");
const {
  emailValidationSchema,
  passwordValidationSchema,
  stringValidationSchema,
  phoneNumberValidationSchema,
} = require("./userSignUp.validator");

const updateSchema = Joi.object({
  name: stringValidationSchema,
  email: emailValidationSchema,
  password: passwordValidationSchema,
  phoneNumber: phoneNumberValidationSchema,
});

const userUpdateValidator = celebrate(
  {
    [Segments.BODY]: updateSchema,
  },
  { abortEarly: false }
);

module.exports = {
  userUpdateValidator,
};
