// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));

// app.post('/whatsapp-webhook', (req, res) => {
// 	const from = req.body.From;
// 	const body = req.body.Body;
// 	console.log(`Message from ${from}: ${body}`);
// 	// Save to DB or Google Sheet here
// 	res.send('<Response></Response>');
// });

// app.listen(3000, () => console.log('Webhook running on port 3000'));
// netlify/functions/whatsapp-webhook.js
const bodyParser = require('body-parser');

// Netlify Functions use a different way to handle request bodies,
// so we'll simulate bodyParser's urlencoded parsing.
const parseUrlEncoded = (event) => {
  return new Promise((resolve, reject) => {
    if (!event.body) {
      resolve({});
      return;
    }
    const params = new URLSearchParams(event.body);
    const parsedBody = {};
    for (const [key, value] of params.entries()) {
      parsedBody[key] = value;
    }
    resolve(parsedBody);
  });
};

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const parsedBody = await parseUrlEncoded(event);
    const from = parsedBody.From;
    const body = parsedBody.Body;

    console.log(`Message from ${from}: ${body}`);
    // Save to DB or Google Sheet here

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
      body: '<Response></Response>',
    };
  } catch (error) {
    console.error('Error processing webhook:', error);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};