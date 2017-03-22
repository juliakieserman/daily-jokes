// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = "https://jokes-website.herokuapp.com";
/*const API_URL = "https://api:#{API_KEY}@api.mailgun.net/v2/appdaa3ee4c6b7d4a63af1502ec885c99f2.mailgun.org"
const mailgun = require('mailgun-js')({apiKey: API_KEY, domain: API_URL});*/

var transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    api_key: API_KEY,
    domain: DOMAIN 
  }
});

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.post('/subscribe', function(req, res) {

  var mailOpts = {
    from: 'kieserman.julia@gmail.com',
    to: 'jbk67@georgetown.edu',
    subject: 'test subject',
    text: 'test message from mailgun',
    html: '<b> test message from mailgun </b>'
  };

  transporter.sendMail(mailOpts, function(err, response) {
    if(err) {
      console.log("NOOOO");
    } else {
      console.log("PARTY IN THE USA");
    }
    transporter.close();
  });
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '8082';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));