const Tutorial = require('../models/tutorials.model.js');

exports.findAll = (req, res) => {
    Tutorial.getAll(Object.keys(req.query).length > 0 ? req.query.title : null,(err, data) => {
        if (err) {
            res.status(500).send({message: err.message || 'Some error occurred while retrieving tutorials'});
        } else {
            res.status(200).json(data);
        } 
    });
};

exports.create = (req, res) => {
    if (req.body.title && req.body.description && String(req.body.published)) {
        try {
            if (parseInt(req.body.published) == 0 || parseInt(req.body.published) == 1) {
                Tutorial.create({ title: req.body.title, description: req.body.description, published: parseInt(req.body.published) }, (err, data) => {
                    if (err) {
                        res.status(500).send({message: err.message || 'Some error occurred while retrieving tutorials'});
                    } else {
                        res.status(201).json({message: 'Tutorial created successfully', location: `/Tutorials/${data.insertId}`});
                    } 
                });
            } else {
                res.status(400).json({error: 'Incomplete or invalid tutorial data'});
            }
        } catch {
            res.status(400).json({error: 'Incomplete or invalid tutorial data'});
        }
    } else {
        res.status(400).json({error: 'Incomplete or invalid tutorial data'});
    }
};

exports.findOne = (req, res) => {
    Tutorial.findById(req.params.tutorialID, (err, data) => {
        if (err) {
            res.status(500).send({message: err.message || 'Some error occurred while retrieving tutorials'});
        } else {
            data.length > 0 ? res.status(200).json(data) : res.status(404).json({error: 'The ID specified does not belong to any tutorial'});
        } 
    });
};

exports.update = (req, res) => {
    if (req.body.title && req.body.description && String(req.body.published)) {
        try {
            if (parseInt(req.body.published) == 0 || parseInt(req.body.published) == 1) {
                Tutorial.updateById({ id: req.params.tutorialID, title: req.body.title, description: req.body.description, published: parseInt(req.body.published) }, (err, data) => {
                    if (err) {
                        res.status(500).send({message: err.message || 'Some error occurred while retrieving tutorials'});
                    } else {
                        data.affectedRows > 0 ? res.status(200).json({message: 'Tutorial updated successfully', location: `/Tutorials/${req.params.tutorialID}`}) : res.status(404).json({error: 'The ID specified does not belong to any tutorial'});
                    } 
                });
            } else {
                res.status(400).json({error: 'Incomplete or invalid tutorial data'});
            }
        } catch {
            res.status(400).json({error: 'Incomplete or invalid tutorial data'});
        }
    } else {
        res.status(400).json({error: 'Incomplete or invalid tutorial data'});
    }
};

exports.delete = (req, res) => {
    Tutorial.remove(req.params.tutorialID, (err, data) => {
        if (err) {
            res.status(500).send({message: err.message || 'Some error occurred while retrieving tutorials'});
        } else {
            data.affectedRows > 0 ? res.status(204).json({message: "Tutorial successfully deleted", location: `/movies/${req.params.tutorialID}`}) : res.status(404).json({error: 'The ID specified does not belong to any tutorial'});
        } 
    });
};

exports.findAllPublished = (req, res) => {
    Tutorial.getAllPublished((err, data) => {
        if (err) {
            res.status(500).send({message: err.message || 'Some error occurred while retrieving tutorials'});
        } else {
            res.status(200).json(data);
        } 
    });
};