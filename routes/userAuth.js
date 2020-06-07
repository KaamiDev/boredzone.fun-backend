const express = require('express');
const db = require('../database/dbconfig');

const userAuth = (req, res, next) => {
	req.user = db.users.findOne({ _id: req.headers.authtoken });
	if (req.user) {
		next();
	} else {
		res.status(403).send('noAuth');
	}
};

module.exports = userAuth;
