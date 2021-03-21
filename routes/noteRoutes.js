const Note = require('../models/Note');
const verifyToken = require('../middlewares/verifyToken');
const { clearHash } = require('../services/cache');

module.exports = app => {
	app.get('/notes', verifyToken, async (req, res) => {
		const notes = await Note
			.find({ user: req.user.userId })
			.cache({ key: req.user.userId });
		res.status(200).json(notes);
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

		clearHash(req.user.userId);
	});

	app.put('/notes/:id', verifyToken, (req, res) => {
		const { title, content } = req.body;
		Note.updateOne({ _id: req.params.id, user: req.user.userId }, { title, content })
			.then(result => {
				if (result.nModified > 0) {
					res.status(200).json({
						message: 'Update Successfully',
					});
				} else {
					res.status(401).json({ message: 'Not authorized!' })
				}
			})
			.catch(err => {
				res.status(500).json({ err })
			})
	});

	app.delete('/notes/:id', verifyToken, (req, res) => {
		Note.deleteOne({ _id: req.params.id, user: req.user.userId })
			.then(result => {
				if (result.n > 0) {
					res.status(200).json({ message: 'Deleted Successfully' });
				} else {
					res.status(401).json({ message: 'Not authorized' });
				}
			}).catch(err => {
				res.status(500).json({ err });
			});
	});

};
