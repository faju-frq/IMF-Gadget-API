import express from 'express'
import { selfDestructGadget } from '../controllers/selfDestruction.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { validateGadgetId } from '../middleware/validation/gadgets.validation.js'
import { validateRequest } from '../middleware/validation.middleware.js'

const router = express.Router()

/**
 * @swagger
 * /api/destruction/{id}/self-destruct:
 *   patch:
 *     summary: Self-destruct a deployed gadget
 *     description: Self-destruct a deployed gadget and update its status as destroyed
 *     tags: [Destruction]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Gadget destroyed
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Gadget self-destructed successfully
 *                self_destruct_sequence:
 *                  type: integer
 *                  example: 999999
 *                status:
 *                  type: string
 *                  example: Destroyed
 *                destroyed_at:
 *                  type: string
 *                  format: date-time
 *       404:
 *         description: Gadget not found
 *       500:
 *         description: Internal server error
 */

router.patch(
  '/:id/self-destruct',
  authenticate,
  validateGadgetId,
  validateRequest,
  selfDestructGadget
)

export default router
