require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT;	 	
const host = process.env.HOST; 	

const corsOptions = { origin: "http://localhost:8080" };

app.use(cors(corsOptions));
app.use(express.json());

app.get(['/', '/libraryapi/v1'], function (req, res) { res.status(200).json({ message: 'welcome to my API :)' }); });

app.use('/libraryapi/v1/users', require('./routes/users.routes.js'))
app.use('/libraryapi/v1/books', require('./routes/books.routes.js'))

app.all('*', function (req, res) { res.status(404).json({ message: 'O recurso acedido não existe' }); })

app.listen(port, host, () => console.log(`App listening at http://${host}:${port}/`));
