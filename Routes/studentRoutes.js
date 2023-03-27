const express = require('express');
const studentController = require('../controller/student.controller');
const checkAuthMiddleware = require('../middleware/check-auth');
const router = express.Router();



/**
 * @swagger
 *  components:
 *    schemas: 
 *      post:
 *        type: object
 *        properties:
 *          Name:
 *           type: string
 *           description: student Name
 *          Address:
 *           type: string
 *           description: Address Name
 *          Semester:
 *           type: integer
 *           description: belongs to which semester
 *          gmail:
 *           type: string
 *           description: gmail id
 */

/**
 * @swagger
 * tags:
 *     name: Students
 *     description: The student managing API endpoint
 */



/**
 * @swagger
 *  /post:
 *   post:
 *     summary: Create a new post 
 *     tags: [Students]
 *     security:
 *	     - jwt: []
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/post'
 *     responses:
 *      201:
 *          description: post Created Successfully
 *      500:
 *          description: Some Server Error
 */
router.post("/",checkAuthMiddleware.checkAuth,studentController.save);


/**
 * @swagger
 * /post:
 *  get:
 *     summary: Returns the list of all the post
 *     tags: [Students]
 *     security:
 *	     - jwt: []
 *     responses:
 *      200:
 *          description: The list of the post
 */
router.get("/",studentController.index);


/**
 * @swagger
 *  /post/{id}:
 *  get:
 *     summary: Get the post by id
 *     tags: [Students]
 *     security:
 *	     - jwt: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *              required: true
 *              description: The post id
 *     responses:
 *      200:
 *          description: The post by id
 *      404:
 *          description: The post was not found
 */

router.get('/:id',studentController.show);



/**
 * @swagger
 *  /post/{id}:
 *   patch:
 *     summary: Update the post by id
 *     tags: [Students]
 *     security:
 *	     - jwt: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *              required: true
 *              description: The post id
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/post'
 *     responses:
 *      200:
 *          description: post Updated Successfully
 *      500:
 *          description: Some Server Error
 */
router.patch('/:id',checkAuthMiddleware.checkAuth,studentController.update);



 /**
  * @swagger
  *  /post/{id}:
  *   delete:
  *     summary: Delete the post by id
  *     tags: [Students]
  *     security:
  *	     - jwt: []
  *     parameters:
  *        - in: path
  *          name: id
  *          schema:
  *              type: integer
  *              required: true
  *              description: The post id
  *     responses:
  *      200:
  *          description: post Deleted Successfully
  *      500:
  *          description: Some Server Error
  */
router.delete("/:id",checkAuthMiddleware.checkAuth,studentController.destroy);

module.exports = router;

