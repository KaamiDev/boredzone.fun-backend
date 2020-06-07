const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/submit', require('./routes/submit'));
app.use('/get-data', require('./routes/get-data'));
app.use('/rank-post', require('./routes/rank-post'));
app.use('/account', require('./routes/account'));

app.get('/', (req, res) => {
	res.send('Hello!');
});

const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
	console.log('Server started and listening on port ' + PORT);
});
