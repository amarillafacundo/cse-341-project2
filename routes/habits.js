const express = require("express");
const router = express.Router();
const controller = require("../controllers/habits");
const isAuthenticated = require("../middleware/authenticate");
/**
 * @swagger
 * /habits:
 *   get:
 *     summary: Get all habits
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", controller.getAll);

/**
 * @swagger
 * /habits/{id}:
 *   get:
 *     summary: Get a habit by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Habit ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:id", controller.getSingle);

/**
 * @swagger
 * /habits:
 *   post:
 *     summary: Create a habit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: Drink Water
 *               category:
 *                 type: string
 *                 example: Health
 *               frequency:
 *                 type: string
 *                 example: Daily
 *               goal:
 *                 type: string
 *                 example: 2 Liters
 *               completed:
 *                 type: boolean
 *                 example: false
 *               streak:
 *                 type: number
 *                 example: 0
 *               createdAt:
 *                 type: string
 *                 example: 2026-03-23
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Invalid input
 */
router.post("/", isAuthenticated, controller.create);

/**
 * @swagger
 * /habits/{id}:
 *   put:
 *     summary: Update a habit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Habit ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               frequency:
 *                 type: string
 *               goal:
 *                 type: string
 *               completed:
 *                 type: boolean
 *               streak:
 *                 type: number
 *               createdAt:
 *                 type: string
 *     responses:
 *       204:
 *         description: Updated
 */
router.put("/:id", isAuthenticated, controller.update);

/**
 * @swagger
 * /habits/{id}:
 *   delete:
 *     summary: Delete a habit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Habit ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete("/:id", isAuthenticated, controller.remove);

module.exports = router;

