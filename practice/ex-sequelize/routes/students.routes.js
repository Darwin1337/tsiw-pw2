const express = require('express');
const studentController = require("../controllers/students.controller");
let router = express.Router();

router.route('/')
    .get(studentController.findAll);

module.exports = router;