const express = require('express');
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/users.controller");

let router = express.Router();

router.route('/:id')
    .get(authController.verifyToken, userController.findOne);

router.route('/login')
    .post(userController.login);

module.exports = router;