import { check, validationResult } from "express-validator";

const validationRules = [
  check("email", "It is should be an email").isEmail(),
  check("password").notEmpty().withMessage("Please enter a password"),
];

function validation(req, res, next) {
  const errors = validationResult(req);
  console.log(errors);
  if (errors.isEmpty()) return next();
  const validationErrors = errors.errors.map((e) => e.msg);
  return res.status(422).json({
    "validation errors:": validationErrors,
  });
}

export { validationRules, validation };
