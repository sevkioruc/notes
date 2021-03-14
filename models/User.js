const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	email: {
		unique: true,
		type: String
	},
	username: {
		unique: true,
		type: String
	},
	password: String
});

module.exports = mongoose.model('User', userSchema);
