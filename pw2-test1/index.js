require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';

app.use(cors());
app.use(express.json());

app.use('/esmad_api', require('./routes/students.routes.js'));

app.all('*', function (req, res) { res.status(404).json({error: 'Resource not found'}); });

app.listen(port, host, () => console.log(`App listening at http://${host}:${port}/`));