const { celebrate, Joi, Segments } = require("celebrate");

const emailValidationSchema = Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "in"] },
  })
  .trim(true)
  .lowercase();

const validateUserLogin = celebrate(
  {
    [Segments.BODY]: {
      email: emailValidationSchema.required(),
      password: Joi.string().required(),
    },
  },
  { abortEarly: false }
);

module.exports = { validateUserLogin, emailValidationSchema };
