const express = require("express");
const userController = require("../controller/user.controller");
const checkAuthMiddleware = require('../middleware/check-auth')
const router= express.Router();


/**
 * @swagger
 *  components:
 *    schemas: 
 *      signup:
 *        type: object
 *        properties:
 *          Name:
 *           type: string
 *           description: Name
 *          email:
 *           type: string
 *           description: email_id
 *          password:
 *           type: string
 *           description: password
 */

/**
 * @swagger
 *  components:
 *    schemas: 
 *      login:
 *        type: object
 *        properties:
 *          email:
 *           type: string
 *           description: email_id
 *          password:
 *           type: string
 *           description: password
 */

/**
 * @swagger
 * tags:
 *     name: User
 *     description: The user managing API endpoint
 */



/**
 * @swagger
 * /user/signUp:
 *   post:
 *     summary: Create a new post 
 *     tags: [User]
 *     security:
 *	     - jwt: []
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/signup'
 *     responses:
 *      201:
 *          description: User Created Successfully
 *      500:
 *          description: Some Server Error
 */

router.post("/signUp",userController.signUp);


/**
 * @swagger
 *  /user/login:
 *   post:
 *     summary: Create a new post 
 *     tags: [User]
 *     security:
 *	     - jwt: []
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/login'
 *     responses:
 *      201:
 *          description: User Created Successfully
 *      500:
 *          description: Some Server Error
 */
router.post("/login",userController.login);

module.exports= router;