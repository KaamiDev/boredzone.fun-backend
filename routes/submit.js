const express = require('express');
const db = require('../database/dbconfig');
const userAuth = require('./userAuth');
const router = express.Router();

router.post('/', userAuth, (req, res) => {
	if (req.body.ideaTitle && req.body.ideaDescription) {
		if (req.body.ideaTitle.length > 50) {
			res.status(400).send('Title can only be a maximum of 50 characters.');
		} else if (req.body.ideaDescription.length > 500) {
			res.status(400).send('Description can only be a maximum of 500 characters.');
		} else {
			let idea = {
				title: req.body.ideaTitle,
				description: req.body.ideaDescription,
				user: req.user.username,
				upvotes: [ req.user._id ],
				downvotes: [],
				date: Date.now()
			};
			db.ideas.save(idea);
			res.status(200).send('Successfully submitted idea!');
		}
	} else {
		res.status(400).send('Please fill in all the fields.');
	}
});

router.post('/delete/:id', userAuth, (req, res) => {
	if (req.params.id) {
		console.log(db.ideas.find({ _id: req.params.id, user: req.user.username }));
		if (db.ideas.findOne({ _id: req.params.id, user: req.user.username })) {
			db.ideas.remove({ _id: req.params.id });
			res.status(200).send('deleted');
		} else {
			res.status(200).send('deleted');
		}
	} else {
		res.status(400).send('Missing fields.');
	}
});

module.exports = router;
