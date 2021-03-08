const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

	app.post('/login', (req, res, next) => {
		User.findOne({ email: req.body.email }, (err, user) => {

			if (err) {
				return res.status(500).json({ message: err });
			}
			if (!user) {
				return res.status(401).json({ message: 'User not found' });
			}
			if (!bcrypt.compareSync(req.body.password, user.password)) {
				return res.status(400).json({ message: 'Login failed' });
			}

			let token = jwt.sign({ userId: res._Id }, 'secretkey');
			return res.status(200).json({
				message: 'Login success',
				token: token
			})

		});
	});

};
