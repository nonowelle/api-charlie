const express = require("express");
const router = express.Router();
const axios = require("axios");

const api_key = process.env.API_KEY;

router.get("/", (req, res, next) => {
  let config = {
    method: "get",
    url: "https://confirmations-1a40.restdb.io/rest/invites",
    headers: {
      "x-apikey": api_key,
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then((response) => {
      console.log("IN THE RESPONSE");

      res.send(response.data);

      res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error.message);
    });
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  const answer = {
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email,
    phone: req.body.phone,
    answer: req.body.response,
  };
  console.log(answer);
  var request = require("request");

  var options = {
    method: "POST",
    url: "https://confirmations-1a40.restdb.io/rest/invites",
    headers: {
      "cache-control": "no-cache",
      "x-apikey": "1cafe281210a9ab5837d477312051f4143e0c",
      "content-type": "application/json",
    },
    body: answer,
    json: true,
  };

  request(options, function (error, response, body) {
    if (error) {
      throw new Error(error);
    } else {
      console.log(response.body);
      res.send(JSON.stringify(response.body));
    }
  });
});

module.exports = router;
