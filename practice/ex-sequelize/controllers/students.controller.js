const db = require("../models/index.js");
const Student = db.student;

const { Op, ValidationError } = require('sequelize');

exports.findAll = async (req, res) => {
    try {
        const students = await Student.findAndCountAll({
            attributes: {
                exclude: ['city_id']
            },
            include: {
                model: db.city,
                attributes: ['name'],
                as: "city"
            }
        });

        res.status(200).json({
            success: true,
            totalItems: students.count,
            students: students.rows,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, msg: err.message || "Some error occurred while retrieving the tutorials." });
    }
};

// // Handle tutorial create on POST
// exports.create = async (req, res) => {
//     try {
//         // Save Tutorial in the database
//         let newTutorial = await Tutorial.create(req.body);
//         res.status(201).json({ success: true, msg: "New tutorial created.", URL: `/tutorials/${newTutorial.id}` });
//     }
//     catch (err) {
//         // console.log(err.name) // err.name === 'SequelizeValidationError'
//         if (err instanceof ValidationError)
//             res.status(400).json({ success: false, msg: err.errors.map(e => e.message) });
//         else
//             res.status(500).json({
//                 success: false, msg: err.message || "Some error occurred while creating the tutorial."
//             });
//     };
// };

// // List just one tutorial
// exports.findOne = async (req, res) => {
//     try {
//         // obtains only a single entry from the table, using the provided primary key
//         let tutorial = await Tutorial.findByPk(req.params.idT, {
//             include: [{
//                 model: db.comment,
//                 // required: true,
//                 attributes: ['id', 'author', 'text'] // exclude FK tutorialId
//             },
//             {
//                 model: db.tag,
//                 through: { attributes: [] } // exclude data from junction table
//             }]
//         })
//         // if tutorial was not found
//         if (tutorial === null)
//             return res.status(404).json({
//                 success: false, msg: `Cannot find any tutorial with ID ${req.params.idT}.`
//             });
//         // answer with a success status if tutorial was found
//         res.json({ success: true, tutorial: tutorial });
//     }
//     catch (err) {
//         res.status(500).json({
//             success: false, msg: `Error retrieving tutorial with ID ${req.params.idT}.`
//         });
//     };
// };

// // Update a tutorial
// exports.update = async (req, res) => {

//     try {
//         // since Sequelize update() does not distinguish if a tutorial exists, first let's try to find one
//         let tutorial = await Tutorial.findByPk(req.params.idT);
//         if (tutorial === null)
//             return res.status(404).json({
//                 success: false, msg: `Cannot find any tutorial with ID ${req.params.idT}.`
//             });

//         // obtains only a single entry from the table, using the provided primary key
//         let affectedRows = await Tutorial.update(req.body, { where: { id: req.params.idT } })

//         if (affectedRows[0] === 0) // check if the tutorial was updated (returns [0] if no data was updated)
//             return res.status(200).json({
//                 success: true, msg: `No updates were made on tutorial with ID ${req.params.idT}.`
//             });

//         return res.json({
//             success: true,
//             msg: `Tutorial with ID ${req.params.idT} was updated successfully.`
//         });
//     }
//     catch (err) {
//         if (err instanceof ValidationError)
//             return res.status(400).json({ success: false, msg: err.errors.map(e => e.message) });
//         res.status(500).json({
//             success: false, msg: `Error retrieving tutorial with ID ${req.params.idT}.`
//         });
//     };
// };

// // Update one tutorial
// exports.delete = async (req, res) => {
//     try {
//         let result = await Tutorial.destroy({ where: { id: req.params.idT } })
//         // console.log(result)
//         if (result == 1) // the promise returns the number of deleted rows
//             return res.status(200).json({
//                 success: true, msg: `Tutorial with id ${req.params.idT} was successfully deleted!`
//             });
//         // no rows deleted -> no tutorial was found
//         return res.status(404).json({
//             success: false, msg: `Cannot find any tutorial with ID ${req.params.idT}.`
//         });
//     }
//     catch (err) {
//         // console.log(err)
//         res.status(500).json({
//             success: false, msg: `Error deleting tutorial with ID ${req.params.idT}.`
//         });
//     };
// };

// // Display list of all published tutorials
// exports.findAllPublished = async (req, res) => {
//     //get data from request query string (if not existing, they will be undefined)
//     let { page, size } = req.query;

//     // validate page
//     if (page && !req.query.page.match(/^(0|[1-9]\d*)$/g))
//         return res.status(400).json({ message: 'Page number must be 0 or a positive integer' });
//     page = parseInt(page); // if OK, convert it into an integer
//     // validate size
//     if (size && !req.query.size.match(/^([1-9]\d*)$/g))
//         return res.status(400).json({ message: 'Size must be a positive integer' });
//     size = parseInt(size); // if OK, convert it into an integer

//     // Sequelize function findAndCountAll parameters: 
//     //      limit -> number of rows to be retrieved
//     //      offset -> number of rows to be offseted (not retrieved)
//     const limit = size ? size : 3;          // limit = size (default is 3)
//     const offset = page ? page * limit : 0; // offset = page * size (start counting from page 0)

//     try {
//         let tutorials = await Tutorial.findAndCountAll({ where: { published: true }, limit, offset })

//         // map default response to desired response data structure
//         res.status(200).json({
//             success: true,
//             totalItems: tutorials.count,
//             tutorials: tutorials.rows,
//             totalPages: Math.ceil(tutorials.count / limit),
//             currentPage: page ? page : 0
//         });
//     }
//     catch (err) {
//         res.status(500).json({
//             success: false, msg: err.message || "Some error occurred while retrieving published tutorials."
//         })
//     }
// };

// // Add tag to tutorial
// exports.addTag = async (req, res) => {
//     try {
//         // try to find the tutorial, given its ID
//         let tutorial = await Tutorial.findByPk(req.params.idT)
//         if (tutorial === null)
//             return res.status(404).json({
//                 success: false, msg: `Cannot find any tutorial with ID ${req.params.idT}.`
//             });

//         // try to find the tag, given its ID
//         let tag = await Tag.findByPk(req.params.idTag)
//         if (tag === null)
//             return res.status(404).json({
//                 success: false, msg: `Cannot find any tag ${req.params.idTag}.`
//             });

//         let result = await tutorial.addTag(tag);
//         // console.log(result)
//         if (result == undefined)
//             return res.status(404).json({
//                 success: false, msg: `Tutorial id ${req.params.idT} already has tag ${req.params.idTag}.`
//             });
//         return res.status(200).json({
//             success: true, msg: `Tag ${req.params.idTag} was added to tutorial with id ${req.params.idT}!`
//         });

//     }
//     catch (err) {
//         res.status(500).json({
//             success: false, msg: `Error adding tag ${req.params.idTag} to tutorial with ID ${req.params.idT}.`
//         });
//     };
// };

// // Remove tag from tutorial
// exports.deleteTag = async (req, res) => {
//     try {
//         // try to find the tutorial, given its ID
//         let tutorial = await Tutorial.findByPk(req.params.idT)
//         if (tutorial === null)
//             return res.status(404).json({
//                 success: false, msg: `Cannot find any tutorial with ID ${req.params.idT}.`
//             });

//         // try to find the tag, given its ID
//         let tag = await Tag.findByPk(req.params.idTag)
//         if (tag === null)
//             return res.status(404).json({
//                 success: false, msg: `Cannot find any tag ${req.params.idTag}.`
//             });

//         let result = await tutorial.removeTag(tag);
//         // console.log(result)
//         if (result == 0)
//             return res.status(404).json({
//                 success: false, msg: `Tutorial id ${req.params.idT} does not have tag ${req.params.idTag}.`
//             });
//         return res.status(200).json({
//             success: true, msg: `Tag ${req.params.idTag} was removed from tutorial with id ${req.params.idT}!`
//         });

//     }
//     catch (err) {
//         res.status(500).json({
//             success: false, msg: `Error adding tag ${req.params.idTag} to tutorial with ID ${req.params.idT}.`
//         });
//     };
// };