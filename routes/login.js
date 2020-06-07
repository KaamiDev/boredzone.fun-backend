const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../database/dbconfig');
const router = express.Router();

router.post('/', (req, res) => {
	if (req.body.email && req.body.password) {
		let account = db.users.findOne({ email: req.body.email.trim().toLowerCase() });
		if (account) {
			bcrypt.compare(req.body.password, account.password, function(err, result) {
				if (result) {
					res.status(200).send(account._id);
				} else {
					res.status(400).send('Password is incorrect.');
				}
			});
		} else {
			res.status(400).send('Email does not exist.');
		}
	} else {
		res.status(400).send('Please fill in all the fields.');
	}
});

module.exports = router;
