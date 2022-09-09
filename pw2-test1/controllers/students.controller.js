const Student = require('../models/students.model.js');
const courses = ['TSIW','TCAV','MULTIMEDIA','FOTOGRAFIA','DESIGN'];

exports.home = (req, res) => {
    res.status(200).json({success: 'Home - ESMAD API'});
};

exports.getAll = (req, res) => {
    Student.getAll(Object.keys(req.query).length > 0 ? req.query : null, (err, data) => {
        if (err) {
            res.status(500).send({message: err.message || 'Some error occurred while retrieving tutorials'});
        } else {
            res.status(200).json(data);
        } 
    });
};

exports.addStudent = (req, res) => {
    // FALTA O ERRO DO NUMERO JA EXISTIR
    // FALTA O ERRO DO NUMERO JA EXISTIR
    // FALTA O ERRO DO NUMERO JA EXISTIR
    if (req.body.name) {
        if (String(req.body.number) && req.body.gender && courses.indexOf(req.body.course.toUpperCase()) > -1) {
            if (req.body.gender.toLowerCase() == "m" || req.body.gender.toLowerCase() == "f") {
                Student.add({ number: req.body.number, name: req.body.name, gender: req.body.gender, course: req.body.course }, (err, data) => {
                    if (err) {
                        res.status(500).send({message: err.message || 'Some error occurred'});
                    } else {
                        res.status(201).json({ "message": "Student created!" , "URL": `esmad_api/students/${data.insertId}` });
                    } 
                });
            } else {
                res.status(400).json({ "message": "Accepted values for gender: M or F!" });
            }
        } else {
            res.status(400).json({ "message": "Incomplete or invalid tutorial data" });
        }
    } else {
        res.status(400).json({ "message": "Must provide the student’s name!" });
    }
};

exports.studentsByCourse = (req, res) => {
    Student.findByCourse(req.params.course, (err, data) => {
        if (err) {
            res.status(500).send({message: err.message || 'Some error occurred'});
        } else {
            data.length > 0 ? res.status(200).json({ "count": data.length, "students": data }) : res.status(404).json({ "message": 'The course specified does not exist'});
        } 
    });
}

exports.changeStudentCourse = (req, res) => {
    Student.getAll(null, (err, data) => {
        if (data.find(stu => stu.number == req.params.number)) {
            if (courses.indexOf(req.body.course.toUpperCase()) > -1) {
                console.log(req.body.course.toUpperCase())
                Student.changeCourse({number: req.params.number, course: req.body.course.toUpperCase()}, (err, data) => {
                    if (err) {
                        res.status(500).send({message: err.message || 'Some error occurred'});
                    } else {
                        data.affectedRows > 0 ? res.status(204).json() : res.status(404).json({ "message": 'The number specified does not belong to any student'});
                    } 
                });
            } else {
                res.status(400).json({ "message": "Invalid course name" });
            }
        } else {
            res.status(404).json({ "message": "The number specified does not belong to any student" });
        }
    });
}