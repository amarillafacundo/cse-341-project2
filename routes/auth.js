const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const passport = require("passport");
const { route } = require("./workouts");

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Invalid input
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout user
 *     responses:
 *       200:
 *         description: Logged out
 */
router.get("/logout", authController.logout);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/", successRedirect: "/api-docs" }));



module.exports = router;
