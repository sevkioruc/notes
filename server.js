const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

mongoose.connect(process.env.mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => {
		console.log('Connected to DB');
	})
	.catch(() => {
		console.log('Connection failed');
	});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/authRoutes')(app);
require('./routes/noteRoutes')(app);

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
	if (err)
		console.log(err);
});
