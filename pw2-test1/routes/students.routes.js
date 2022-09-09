const express = require('express');
let router = express.Router();
const studentController = require('../controllers/students.controller');

router.route('/')
.get(studentController.home);

router.route('/students')
.get(studentController.getAll)
.post(studentController.addStudent);

router.route('/students/:course')
.get(studentController.studentsByCourse);

router.route('/students/:number')
.patch(studentController.changeStudentCourse);

// router.route('/:tutorialID')
// .get(tutorialController.findOne)
// .put(tutorialController.update)
// .delete(tutorialController.delete);

module.exports = router;