const express = require('express');
const instanceController = require("../controllers/instances.controller");
let router = express.Router({mergeParams: true});

router.route('/')
    .post(instanceController.create);


router.route('/:instanceId/')
    .post(instanceController.changeInstance);

module.exports = router;