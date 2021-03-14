const Note = require('../models/Note');
const verifyToken = require('../middlewares/verifyToken');

module.exports = app => {
	app.get('/notes', verifyToken, async (req, res) => {
		try {
			const notes = await Note.find({ user: req.user.userId });
			res.status(200).json(notes);
		}
		catch (err) {
			res.json({
				message: 'Could not get Notes'
			})
		}
	});

	app.get('/notes/:id', verifyToken, async (req, res) => {
		try {
			const note = await Note.findOne({
				user: req.user.userId,
				_id: req.params.id
			});
			res.status(200).json(note);
		}
		catch (err) {
			res.json({
				message: 'Could not get the note'
			})
		}
	});

	app.post('/notes', verifyToken, async (req, res) => {
		const { title, content } = req.body;

		const note = new Note({
			title,
			content,
			user: req.user.userId
		});

		try {
			await note.save();
			res.status(201).json(note);
		} catch (err) {
			res.status(400).json({
				err,
				message: 'Could not create note'
			});
		}
	});

};
