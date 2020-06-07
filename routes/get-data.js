const express = require('express');
const userAuth = require('./userAuth');
const db = require('../database/dbconfig');
const router = express.Router();

router.get('/home', (req, res) => {
	req.user = db.users.findOne({ _id: req.headers.authtoken });
	let data = db.ideas
		.find()
		.sort((a, b) => {
			let first = a.upvotes.length - a.downvotes.length;
			let second = b.upvotes.length - b.downvotes.length;
			return first - second;
		})
		.reverse()
		.slice(0, 3);
	res.status(200).send(
		data.map((idea) => {
			idea.rank = idea.upvotes.length - idea.downvotes.length;
			if (req.user) {
				idea.upvoted = idea.upvotes.indexOf(req.user._id) === -1 ? false : true;
				idea.downvoted = idea.downvotes.indexOf(req.user._id) === -1 ? false : true;
			}
			delete idea.upvotes;
			delete idea.downvotes;
			return idea;
		})
	);
});

router.get('/browse/:id', (req, res) => {
	req.user = db.users.findOne({ _id: req.headers.authtoken });

	if (req.params.id === 'mostpopular') {
		let data = db.ideas
			.find()
			.sort((a, b) => {
				let first = a.upvotes.length - a.downvotes.length;
				let second = b.upvotes.length - b.downvotes.length;
				return first - second;
			})
			.reverse();
		res.status(200).send(
			data.map((idea) => {
				idea.rank = idea.upvotes.length - idea.downvotes.length;
				if (req.user) {
					idea.upvoted = idea.upvotes.indexOf(req.user._id) === -1 ? false : true;
					idea.downvoted = idea.downvotes.indexOf(req.user._id) === -1 ? false : true;
				}
				delete idea.upvotes;
				delete idea.downvotes;
				return idea;
			})
		);
	} else if (req.params.id === 'leastpopular') {
		let data = db.ideas.find().sort((a, b) => {
			let first = a.upvotes.length - a.downvotes.length;
			let second = b.upvotes.length - b.downvotes.length;
			return first - second;
		});
		res.status(200).send(
			data.map((idea) => {
				idea.rank = idea.upvotes.length - idea.downvotes.length;
				if (req.user) {
					idea.upvoted = idea.upvotes.indexOf(req.user._id) === -1 ? false : true;
					idea.downvoted = idea.downvotes.indexOf(req.user._id) === -1 ? false : true;
				}
				delete idea.upvotes;
				delete idea.downvotes;
				return idea;
			})
		);
	} else if (req.params.id === 'newest') {
		let data = db.ideas
			.find()
			.sort((a, b) => {
				let first = a.date;
				let second = b.date;
				return first - second;
			})
			.reverse();
		res.status(200).send(
			data.map((idea) => {
				idea.rank = idea.upvotes.length - idea.downvotes.length;
				if (req.user) {
					idea.upvoted = idea.upvotes.indexOf(req.user._id) === -1 ? false : true;
					idea.downvoted = idea.downvotes.indexOf(req.user._id) === -1 ? false : true;
				}
				delete idea.upvotes;
				delete idea.downvotes;
				return idea;
			})
		);
	} else if (req.params.id === 'oldest') {
		let data = db.ideas.find().sort((a, b) => {
			let first = a.date;
			let second = b.date;
			return first - second;
		});
		res.status(200).send(
			data.map((idea) => {
				idea.rank = idea.upvotes.length - idea.downvotes.length;
				if (req.user) {
					idea.upvoted = idea.upvotes.indexOf(req.user._id) === -1 ? false : true;
					idea.downvoted = idea.downvotes.indexOf(req.user._id) === -1 ? false : true;
				}
				delete idea.upvotes;
				delete idea.downvotes;
				return idea;
			})
		);
	} else {
		res.status(400).send('Missing fields.');
	}
});

router.get('/submitted', userAuth, (req, res) => {
	let data = db.ideas
		.find()
		.filter((idea) => idea.user === req.user.username)
		.sort((a, b) => {
			let first = a.date;
			let second = b.date;
			return first - second;
		})
		.reverse();

	res.status(200).send(
		data.map((idea) => {
			idea.rank = idea.upvotes.length - idea.downvotes.length;
			if (req.user) {
				idea.upvoted = idea.upvotes.indexOf(req.user._id) === -1 ? false : true;
				idea.downvoted = idea.downvotes.indexOf(req.user._id) === -1 ? false : true;
			}
			delete idea.upvotes;
			delete idea.downvotes;
			return idea;
		})
	);
});

module.exports = router;
