const express = require('express');
const db = require('../database/dbconfig');
const userAuth = require('./userAuth');
const router = express.Router();

router.post('/upvote/:id', userAuth, (req, res) => {
	let idea = db.ideas.findOne({ _id: req.params.id });
	if (idea) {
		let indexDownvoted = idea.downvotes.indexOf(req.user._id);
		let indexUpvoted = idea.upvotes.indexOf(req.user._id);

		if (indexDownvoted !== -1) idea.downvotes.splice(indexDownvoted, 1);

		if (indexUpvoted !== -1) {
			idea.upvotes.splice(indexUpvoted, 1);
		} else {
			idea.upvotes.push(req.user._id);
		}

		db.ideas.update({ _id: req.params.id }, { upvotes: idea.upvotes, downvotes: idea.downvotes });
		res.status(200).send({
			newRank: idea.upvotes.length - idea.downvotes.length,
			upvoted: idea.upvotes.indexOf(req.user._id) !== -1 ? true : false,
			downvoted: idea.downvotes.indexOf(req.user._id) !== -1 ? true : false
		});
	} else {
		res.status(400).send('Missing fields.');
	}
});

router.post('/downvote/:id', userAuth, (req, res) => {
	let idea = db.ideas.findOne({ _id: req.params.id });
	if (idea) {
		let indexDownvoted = idea.downvotes.indexOf(req.user._id);
		let indexUpvoted = idea.upvotes.indexOf(req.user._id);

		if (indexUpvoted !== -1) idea.upvotes.splice(indexUpvoted, 1);

		if (indexDownvoted !== -1) {
			idea.downvotes.splice(indexDownvoted, 1);
		} else {
			idea.downvotes.push(req.user._id);
		}

		db.ideas.update({ _id: req.params.id }, { upvotes: idea.upvotes, downvotes: idea.downvotes });
		res.status(200).send({
			newRank: idea.upvotes.length - idea.downvotes.length,
			upvoted: idea.upvotes.indexOf(req.user._id) !== -1 ? true : false,
			downvoted: idea.downvotes.indexOf(req.user._id) !== -1 ? true : false
		});
	} else {
		res.status(400).send('Missing fields.');
	}
});

module.exports = router;
