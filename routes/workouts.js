const express = require("express");
const router = express.Router();
const controller = require("../controllers/workouts");



/**
 * @swagger
 * /workouts:
 *   get:
 *     summary: Get all workouts
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", controller.getAll);

/**
 * @swagger
 * /workouts/{id}:
 *   get:
 *     summary: Get a workout by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Workout ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:id", controller.getSingle);

/**
 * @swagger
 * /workouts:
 *   post:
 *     summary: Create a new workout
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - difficulty
 *             properties:
 *               name:
 *                 type: string
 *                 example: Push Ups
 *               difficulty:
 *                 type: string
 *                 example: Beginner
 *               duration:
 *                 type: number
 *                 example: 30
 *               equipment:
 *                 type: string
 *                 example: None
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Push Ups", "Squats"]
 *               calories:
 *                 type: number
 *                 example: 200
 *               createdBy:
 *                 type: string
 *                 example: Facundo
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Invalid input
 */

router.post("/", controller.create);

/**
 * @swagger
 * /workouts/{id}:
 *   put:
 *     summary: Update a workout
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Workout ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               difficulty:
 *                 type: string
 *               duration:
 *                 type: number
 *               equipment:
 *                 type: string
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: string
 *               calories:
 *                 type: number
 *               createdBy:
 *                 type: string
 *     responses:
 *       204:
 *         description: Updated
 */

router.put("/:id", controller.update);

/**
 * @swagger
 * /workouts/{id}:
 *   delete:
 *     summary: Delete a workout
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Workout ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 */

router.delete("/:id", controller.remove);


module.exports = router;
