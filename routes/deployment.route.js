import express from 'express'
import { gadgetDeployment } from '../controllers/deployment.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { validateGadgetId } from '../middleware/validation/gadgets.validation.js'
import { validateRequest } from '../middleware/validation.middleware.js'

const router = express.Router()

/**
 * @swagger
 * /api/deployment/{id}/deployed:
 *   patch:
 *     summary: Deploy a Gadget
 *     description: Deploy a gadget and update its status as deployed
 *     tags: [Deployment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Gadget deployed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Gadget deployed successfully
 *                 gadget:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                     owner_id:
 *                       type: string
 *                       format: uuid
 *                     status:
 *                       type: string
 *                       example: Deployed
 *                     deployed_at:
 *                       type: string
 *                       example: 2025-06-21T10:51:13.135Z
 *                     self_destruct_sequence:
 *                       type: integer
 *                       example: 999999
 *                     description:
 *                       type: string
 *                       example: The annualwhitefirefly - 44% success probability (red skin)
 *       400:
 *         description: Gadget not available for deployment
 *       404:
 *         description: Gadget not found
 *       500:
 *         description: Internal server error
 */

router.patch('/:id/deployed', authenticate, validateGadgetId, validateRequest, gadgetDeployment)

export default router
