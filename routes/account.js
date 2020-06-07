const express = require('express');
const db = require('../database/dbconfig');
const bcrypt = require('bcryptjs');
const userAuth = require('./userAuth');
const router = express.Router();

router.get('/getinfo', userAuth, (req, res) => {
	res.status(200).send(req.user.username);
});

router.post('/changepw', userAuth, (req, res) => {
	if (req.body.oldPassword && req.body.newPassword && req.body.confirmNewPassword) {
		if (req.body.newPassword === req.body.confirmNewPassword) {
			bcrypt.compare(req.body.oldPassword, req.user.password, function(err, result) {
				if (result) {
					bcrypt.hash(req.body.newPassword, 8, function(err, hash) {
						db.users.update({ _id: req.user._id }, { password: hash });
						res.status(200).send('Password changed successfully.');
					});
				} else {
					res.status(400).send('Old password is incorrect.');
				}
			});
		} else {
			res.status(400).send('Confirm password does not match.');
		}
	} else {
		res.status(400).send('Please fill in all the fields.');
	}
});

module.exports = router;
