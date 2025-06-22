import { body } from 'express-validator'

export const validateRegister = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name must contain only letters and spaces')
    .custom((value) => {
    if (/^\s/.test(value) || /\s$/.test(value)) {
      throw new Error('Name cannot start or end with a space');
    }
    return true;
  }),

  body('email').isEmail().withMessage('Please provide a valid email'),

  body('phone_number')
    .notEmpty()
    .withMessage('Phone number is required')
    .isMobilePhone('any', { strictMode: false })
    .withMessage('Phone number must be valid')
    .custom((value) => {
    if (/^\s/.test(value) || /\s$/.test(value)) {
      throw new Error('Mobile number cannot start or end with a space');
    }
    return true;
  }),

  body('password')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1
    })
    .withMessage('Password must be strong with 8+ chars, upper/lowercase, and a number')
]

export const validateLogin = [
  body('email').isEmail().withMessage('Enter a valid email'),

  body('password').notEmpty().withMessage('Password is required')
]
