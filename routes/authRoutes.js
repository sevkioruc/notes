const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = (app) => {
	app.post('/register', (req, res, next) => {
		const newUser = new User({
			email: req.body.email,
			name: req.body.name,
			password: bcrypt.hashSync(req.body.password, 10)
		})

		console.log(newUser);
	});
};
