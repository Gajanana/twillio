const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/whatsapp-webhook', (req, res) => {
	const from = req.body.From;
	const body = req.body.Body;
	console.log(`Message from ${from}: ${body}`);
	// Save to DB or Google Sheet here
	res.send('<Response></Response>');
});

app.listen(3000, () => console.log('Webhook running on port 3000'));
