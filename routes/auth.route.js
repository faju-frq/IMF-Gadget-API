import express from 'express'
import { register, login, logout, deleteUser } from '../controllers/auth.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { validateLogin, validateRegister } from '../middleware/validation/auth.validation.js'
import { validateRequest } from '../middleware/validation.middleware.js'

const router = express.Router()

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user by providing details.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone_number
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *                 description: Must contain only letters and spaces, cannot start or end with a space, and must be less than 50 characters.
 *               email:
 *                 type: string
 *                 example: Johndoe@example.com
 *                 description: Must be a valid email address.
 *               phone_number:
 *                 type: string
 *                 example: 9123456789
 *                 description: Must be a valid Indian mobile number (Start with 6, 7, 8, or 9. can also have +91 or 91 before the number)
 *               password:
 *                 type: string
 *                 example: John@123.
 *                 description: Must be a strong password with at least 8 characters, including uppercase, lowercase, numbers, and special characters.
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: Johndoe@example.com
 *                 phone:
 *                   type: string
 *                   example: 1234567890
 *                 password:
 *                   type: string
 *                   example: John@123.
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               emailRegistered:
 *                 summary: Email already registered
 *                 value:
 *                   message: Email already registered
 *               phoneRegistered:
 *                 summary: Phone number already registered
 *                 value:
 *                   message: Phone number already registered
 *       500:
 *         description: Internal server error
 */

router.post('/register', validateRegister, validateRequest, register)

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: Log in user
 *    description: Login user by providing registered mail and password
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required: [email,password]
 *            properties:
 *              email:
 *                type: string
 *                example: Johndoe@example.com
 *              password:
 *                type: string
 *                example: John@123.
 *    responses:
 *      200:
 *        description: Login successfull
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successfull
 *      401:
 *        description: Invalid credentials
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials provided
 *      500:
 *        description: Internal server error
 */

router.post('/login', validateLogin, validateRequest, login)

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out user
 *     tags: [Auth]
 *     security:
 *      - cookieAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: No token provided"
 *       500:
 *         description: Internal server error
 */

router.post('/logout', authenticate, logout)

/**
 * @swagger
 * /api/auth/deleteUser:
 *   post:
 *     summary: Delete the currently logged-in user
 *     tags: [Auth]
 *     security:
 *      - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - confirmationText
 *             properties:
 *               confirmationText:
 *                 type: string
 *                 example: delete my account
 *                 description: Must be exactly 'delete my account' to confirm deletion
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully.
 *       400:
 *         description: Invalid confirmation text
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please type 'delete my account' to confirm deletion.
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.post('/deleteUser', authenticate, deleteUser)
export default router
