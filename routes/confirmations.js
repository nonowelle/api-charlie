const express = require('express');
const router = express.Router();
const axios = require('axios');
const bodyParser = require('body-parser');

const api_key = process.env.API_KEY;
const cors = require('cors');

router.use(bodyParser.json());

const corsOptions = {
  origin: true,
  methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Origin',
    'Access-Control-Allow-Origin',
    'Accept',
    'Options',
  ],
};

router.get('/', cors(corsOptions), (req, res) => {
  let config = {
    method: 'get',
    url: 'https://confirmations-1a40.restdb.io/rest/invites',
    headers: {
      'x-apikey': process.env.API_KEY,
      'Content-Type': 'application/json',
    },
    responseType: 'stream',
  };

  axios(config)
    .then((response) => {
      console.log('IN THE RESPONSE');
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error.message);
    });
});

router.post('/', cors(corsOptions), (req, res) => {
  console.log(req.body);

  const answer = {
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email,
    phone: req.body.phone,
    answer: req.body.answer,
  };

  let request = require('request');

  let options = {
    method: 'POST',
    url: 'https://confirmations-1a40.restdb.io/rest/invites',
    headers: {
      'cache-control': 'no-cache',
      'x-apikey': process.env.XAPIKEY,
      'content-type': 'application/json',
    },
    body: answer,
    json: true,
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
});

module.exports = router;
