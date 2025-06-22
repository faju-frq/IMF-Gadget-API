import { param, body, query } from 'express-validator'

export const validateGadgetId = [param('id').isUUID().withMessage('Gadget ID must be a valid UUID')]

export const validateGadgetUpdate = [
  body('name')
    .optional()
    .trim()
    .matches(/^[a-zA-Z\s]+$/)
    .notEmpty()
    .withMessage('Name cannot be empty'),
  body('skin')
    .optional()
    .trim()
    .matches(/^[a-zA-Z\s]+$/)
    .notEmpty()
    .withMessage('Skin cannot be empty')
]

export const validateStatusQuery = [
  query('status')
    .optional()
    .isIn(['Available', 'Deployed', 'Destroyed', 'Decommissioned'])
    .withMessage('Invalid status filter')
]
