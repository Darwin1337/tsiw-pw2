const express = require('express');
const app = express();
const movies = require('./routes/movies.routes.js');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/movies', movies);

app.route('*')
.get((req, res) => {
    res.status(404).json({error: 'Resource not found'});
})
.post((req, res) => {
    res.status(404).json({error: 'Resource not found'});
})
.put((req, res) => {
    res.status(404).json({error: 'Resource not found'});
})
.delete((req, res) => {
    res.status(404).json({error: 'Resource not found'});
})
.patch((req, res) => {
    res.status(404).json({error: 'Resource not found'});
});

app.listen(port, hostname, (error) => {
    console.log(`App listening at http://${hostname}:${port}/`)
});