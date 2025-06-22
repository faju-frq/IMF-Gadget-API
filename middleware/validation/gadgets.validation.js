import { param, body, query } from 'express-validator'

export const validateGadgetId = [param('id').isUUID().withMessage('Gadget ID must be a valid UUID')]

export const validateGadgetUpdate = [
  body('name')
    .optional()
    .matches(/^[a-zA-Z\s]+$/)
    .notEmpty()
    .withMessage('Name cannot be empty')
    .custom((value) => {
      if (/^\s/.test(value) || /\s$/.test(value)) {
        throw new Error('Name cannot start or end with a space')
      }
      return true
    }),
  body('skin')
    .optional()
    .matches(/^[a-zA-Z\s]+$/)
    .notEmpty()
    .withMessage('Skin cannot be empty')
    .custom((value) => {
      if (/^\s/.test(value) || /\s$/.test(value)) {
        throw new Error('Name cannot start or end with a space')
      }
      return true
    })
]

export const validateStatusQuery = [
  query('status')
    .optional()
    .isIn(['Available', 'Deployed', 'Destroyed', 'Decommissioned'])
    .withMessage('Invalid status filter')
]
