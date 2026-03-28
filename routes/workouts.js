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
 *     summary: Create a workout
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", controller.create);

/**
 * @swagger
 * /workouts/{id}:
 *   put:
 *     summary: Update a workout
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
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete("/:id", controller.remove);


module.exports = router;
