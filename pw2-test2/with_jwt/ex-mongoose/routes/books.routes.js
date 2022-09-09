const express = require('express');

let router = express.Router({mergeParams: true});

router.use('/:bookId/instances', require('./instances.routes.js'))

module.exports = router;