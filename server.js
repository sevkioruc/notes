const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
	console.log(err);
});
