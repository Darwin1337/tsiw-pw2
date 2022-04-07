const express = require('express');
let router = express.Router();
const tutorialController = require('../controllers/tutorials.controller');

router.route('/')
.get(tutorialController.findAll)
.post(tutorialController.create);

router.route('/published')
.get(tutorialController.findAllPublished);

router.route('/:tutorialID')
.get(tutorialController.findOne)
.put(tutorialController.update)
.delete(tutorialController.delete);

module.exports = router;