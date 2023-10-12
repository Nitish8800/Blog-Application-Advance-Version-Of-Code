const { celebrate, Joi, Segments } = require("celebrate");
const { joiPasswordExtendCore } = require("joi-password");
const { emailValidationSchema } = require("./login.validator");
const joiPassword = Joi.extend(joiPasswordExtendCore);

const stringValidationSchema = Joi.string().min(1);

const passwordValidationSchema = joiPassword
  .string()
  .not(null)
  .minOfSpecialCharacters(1)
  .minOfNumeric(1)
  .minOfLowercase(1)
  .minOfUppercase(1)
  .min(8)
  .max(20)
  .noWhiteSpaces()
  .messages({
    "password.minOfUppercase":
      "{#label} should contain at least {#min} uppercase character",
    "password.minOfSpecialCharacters":
      "{#label} should contain at least {#min} special character",
    "password.minOfLowercase":
      "{#label} should contain at least {#min} lowercase character",
    "password.minOfNumeric":
      "{#label} should contain at least {#min} numeric character",
    "password.noWhiteSpaces": "{#label} should not contain white spaces",
  });

const phoneNumberValidationSchema = Joi.string().length(10);

const userSignUP = celebrate(
  {
    [Segments.BODY]: {
      name: stringValidationSchema.required(),
      email: emailValidationSchema.required(),
      password: passwordValidationSchema.required(),
      phoneNumber: phoneNumberValidationSchema.required(),
    },
  },
  { abortEarly: false }
);

module.exports = {
  userSignUP,
  stringValidationSchema,
  emailValidationSchema,
  passwordValidationSchema,
  phoneNumberValidationSchema,
};
