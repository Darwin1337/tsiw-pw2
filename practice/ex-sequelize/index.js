require('dotenv').config();
const express = require('express'); 
const cors = require('cors');

const app = express();
const port = process.env.PORT;	 	
const host = process.env.HOST;

app.use(cors());
app.use(express.json());

app.get(['/', '/api'], function (req, res) {
    res.status(200).json({ success: true, message: 'welcome to my API :)' });
});

app.use('/api/students', require('./routes/students.routes.js'));

app.all('*', function (req, res) {
    res.status(404).json({ message: 'O recurso acedido não existe' });
});

app.listen(port, host, () => console.log(`Server listening at http://${host}:${port}/`));
