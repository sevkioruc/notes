const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = (app) => {
	app.post('/register', (req, res, next) => {
		const newUser = new User({
			email: req.body.email,
			username: req.body.username,
			password: bcrypt.hashSync(req.body.password, 10)
		})

		newUser.save(err => {
			if (err) {
				return res.status(400).json({ message: 'Error' });
			}
			return res.status(200).json({ message: 'Register success' });
		});
	});
};
