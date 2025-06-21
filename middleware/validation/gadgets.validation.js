import { param, body, query } from "express-validator";

export const validateGadgetId = [
  param("id").isUUID().withMessage("Gadget ID must be a valid UUID"),
];

export const validateGadgetUpdate = [
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("skin").optional().notEmpty().withMessage("Skin cannot be empty"),
];

export const validateStatusQuery = [
  query("status")
    .optional()
    .isIn(["Available", "Deployed", "Destroyed", "Decommissioned"])
    .withMessage("Invalid status filter"),
];
