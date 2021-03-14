const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const token = req.header('Authorization').split(' ')[1];
	if (!token) {
		return res.status(401).json({
			error: 'Access denied'
		});
	}

	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		console.log(err);
		res.status(400).json({ error: 'Token is not valid' });
	}
};

module.exports = verifyToken;
