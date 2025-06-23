import express from 'express'
import {
  postGadgets,
  listGadgets,
  updateGadgets,
  deleteGadgets
} from '../controllers/gadget.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'
import {
  validateGadgetId,
  validateGadgetUpdate,
  validateStatusQuery
} from '../middleware/validation/gadgets.validation.js'
import { validateRequest } from '../middleware/validation.middleware.js'

const router = express.Router()

/**
 * @swagger
 * /api/gadgets:
 *  post:
 *    summary: Create a new gadget
 *    description: Automatically create a new gadget without any user input
 *    tags: [Gadgets]
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      201:
 *        description: Gadget created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Gadget created successfully
 *                gadget:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      format: uuid
 *                    status:
 *                      type: string
 *                      example: Available
 *                    owner_id:
 *                      type: string
 *                      format: uuid
 *                    self_destruct_sequence:
 *                      type: integer
 *                      example: 999999
 *                    description:
 *                      type: string
 *                      example: The annualwhitefirefly - 44% success probability (red skin)
 *      401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: No token provided"
 *      500:
 *        description: Internal server error
 */

router.post('/', authenticate, postGadgets)

/**
 * @swagger
 * /api/gadgets:
 *   get:
 *     summary: Get list of all gadgets
 *     tags: [Gadgets]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Available, Deployed, Destroyed, Decommissioned]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */

router.get('/', validateStatusQuery, validateRequest, listGadgets)

/**
 * @swagger
 * /api/gadgets/{id}:
 *   patch:
 *     summary: Update gadget's name or skin
 *     tags:
 *       - Gadgets
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The UUID of the gadget to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               skin:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update successfull
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *            examples:
 *              nameUpdated:
 *                summary: Only name updated
 *                value:
 *                  message: Name updated successfully
 *              skinUpdated:
 *                summary: Only skin updated
 *                value:
 *                  message: Skin updated successfully
 *              bothUpdated:
 *                summary: Both name and skin updated
 *                value:
 *                  message: Name and skin updated successfully
 *       204:
 *         description: No fields to update provided
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorised: No token provided"
 *       404:
 *         description: Gadget not found
 *       500:
 *         description: Internal server error
 */

router.patch(
  '/:id',
  authenticate,
  validateGadgetId,
  validateGadgetUpdate,
  validateRequest,
  updateGadgets
)

/**
 * @swagger
 * /api/gadgets/{id}/decommission:
 *   patch:
 *     summary: Decommission a gadget
 *     description: Decommission a gadget and update its status as decommissioned
 *     tags: [Gadgets]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gadget decommissioned successfully
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Gadget decommissioned successfully
 *                  status:
 *                    type: string
 *                    example: Decommissioned
 *                  decommissioned_at:
 *                    type: string
 *                    format: date-time
 *       404:
 *         description: Gadget not found
 *       500:
 *         description: Internal server error
 */

router.patch('/:id/decommission', authenticate, validateGadgetId, validateRequest, deleteGadgets)

export default router
