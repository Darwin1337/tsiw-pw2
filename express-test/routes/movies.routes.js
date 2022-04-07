const express = require('express');
let data = require('../models/movies.model.js');
const router = express.Router();

router.route('/')
.get((req, res) => {
    res.json(data);
})
.post((req, res) => {
    if (req.body.name && req.body.year && String(req.body.rating)) {
        if (req.body.year.match(/^[0-9]{4}$/g) && String(req.body.rating).match(/^[0-9]\.[0-9]$/g)) {
            data.push({
                id: data.length == 0 ? 1 : data[data.length - 1].id + 1,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            });
            res.status(201).json({success: "New movie added", location: `/movies/${data[data.length - 1].id}`});
        } else {
            res.status(400).json({error: 'Incomplete or invalid movie data'});
        }
    } else {
        res.status(400).json({error: 'Incomplete or invalid movie data'});
    }
})
.put((req, res) => {
    res.status(400).json({error: 'The request should specify which resource it is working on'});
})
.delete((req, res) => {
    res.status(400).json({error: 'The request should specify which resource it is working on'});
});

router.route('/:id')
.get((req, res) => {
    const result = data.find(movie => movie.id == req.params.id);
    if (result) {
        res.json(result);
    } else {
        res.status(404).json({error: 'The ID specified does not belong to any movie'});
    } 
})
.put((req, res) => {
    const result = data.findIndex(movie => movie.id == req.params.id);
    if (result != -1) {
        if (req.body.name && req.body.year && String(req.body.rating)) {
            if (req.body.year.match(/^[0-9]{4}$/g) && String(req.body.rating).match(/^[0-9]\.[0-9]$/g)) {
                data[result].name = req.body.name;
                data[result].year = req.body.year;
                data[result].rating = req.body.rating;
                res.status(200).json({success: "Movie updated successfully", location: `/movies/${data[result].id}`});
            } else {
                res.status(400).json({error: 'Incomplete or invalid movie data'});
            }
        } else {
            res.status(400).json({error: 'Incomplete or invalid movie data'});
        }
    } else {
        res.status(404).json({error: 'The ID specified does not belong to any movie'});
    }
})
.delete((req, res) => {
    if (data.find(movie => movie.id == req.params.id)) {
        data = data.filter(movie => movie.id != req.params.id)
        res.status(200).json({success: "Movie successfully deleted", location: `/movies/${req.params.id}`});
    } else {
        res.status(404).json({error: 'The ID specified does not belong to any movie'});
    }
});

module.exports = router;