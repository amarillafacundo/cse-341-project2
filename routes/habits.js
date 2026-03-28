const express = require("express");
const router = express.Router();
const controller = require("../controllers/habits");

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
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", controller.create);

/**
 * @swagger
 * /habits/{id}:
 *   put:
 *     summary: Update a habit
 *     responses:
 *       204:
 *         description: Updated
 */
router.put("/:id", controller.update);

/**
 * @swagger
 * /habits/{id}:
 *   delete:
 *     summary: Delete a habit
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete("/:id", controller.remove);

module.exports = router;
