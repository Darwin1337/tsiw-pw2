const express = require('express');
const bookController = require("../controllers/books.controller");
let router = express.Router({mergeParams: true});

router.route('/:id')
    .get(bookController.findOne);

router.use('/:id/instances', require('./instances.routes.js'));

module.exports = router;