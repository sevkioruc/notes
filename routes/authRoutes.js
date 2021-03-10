const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
	app.post('/register', (req, res, next) => {
		bcrypt.hash(req.body.password, 10)
			.then(hash => {
				const user = new User({
					email: req.body.email,
					username: req.body.username,
					password: hash
				});
				user.save()
					.then(user => {
						res.status(201).json({
							message: 'User added successfully',
							user: user
						});
					})
					.catch(err => {
						res.status(500).json({
							error: err
						});
					});
			});
	});

	app.post('/login', (req, res, next) => {
		let fetchedUser;
		User.findOne({ email: req.body.email })
			.then(user => {
				if (!user) {
					return res.status(401).json({
						message: 'Authentication failed'
					});
				}
				fetchedUser = user;
				return bcrypt.compare(req.body.password, user.password);
			})
			.then(result => {
				if (!result) {
					return res.status(401).json({
						message: 'Authentication failed'
					});
				}
				const token = jwt.sign(
					{ username: fetchedUser.username, userId: fetchedUser.id },
					'secret_this_should_be_longer',
					{ expiresIn: '1h' }
				);
				res.status(200).json({
					token: token,
					expiresIn: 3600
				});
			})
			.catch(err => {
				return res.status(401).json({
					message: 'Authentication failed'
				});
			});
	});

};
