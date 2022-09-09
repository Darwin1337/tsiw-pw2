const express = require('express');
const authController = require("../controllers/auth.controller");
const instanceController = require("../controllers/instances.controller");

let router = express.Router({mergeParams: true});

router.route('/:instanceId')
    .patch(authController.verifyToken, instanceController.changeInstance);

module.exports = router;