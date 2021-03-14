const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
	title: {
		type: String,
		require: true
	},
	content: {
		type: String,
		require: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Note', noteSchema);
