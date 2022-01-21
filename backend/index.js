const express = require('express');
const cors = require('cors');
const conn = require('./db/conn');

const app = express();
const port = 5000;

// config  JSON
app.use(express.json());

// Solve CORS
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// Public folder
app.use(express.static('public'));

//Routes


app.listen(port)