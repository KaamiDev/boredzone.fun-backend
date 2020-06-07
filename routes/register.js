const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../database/dbconfig');
const router = express.Router();

router.post('/', (req, res) => {
	if (req.body.username && req.body.email && req.body.password && req.body.confirmPassword) {
		if (req.body.password === req.body.confirmPassword) {
			if (!db.users.findOne({ username: req.body.username.trim().toLowerCase() })) {
				if (!db.users.findOne({ email: req.body.email.trim().toLowerCase() })) {
					bcrypt.hash(req.body.password, 8, function(err, hash) {
						let user = {
							username: req.body.username.trim().toLowerCase(),
							email: req.body.email.trim().toLowerCase(),
							password: hash
						};
						db.users.save(user);
						res.status(200).send('Account created successfully. You can now login.');
					});
				} else {
					res.status(400).send('That email already belongs to an account.');
				}
			} else {
				res.status(400).send('That username already belongs to an account');
			}
		} else {
			res.status(400).send('Confirm password does not match.');
		}
	} else {
		res.status(400).send('Please fill in all the fields.');
	}
});

module.exports = router;
