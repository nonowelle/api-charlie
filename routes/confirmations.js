const express = require("express");
const router = express.Router();
const axios = require("axios");

const api_key = process.env.API_KEY;
const cors = require("cors");
const corsOptions = {
  origin: true,
  methods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Origin"],
};

router.get("/", cors(corsOptions), (req, res) => {
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

      // res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error.message);
    });
});

router.post("/", cors(corsOptions), async (req, res) => {
  console.log(req.body);
  const answer = {
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email,
    phone: req.body.phone,
    answer: req.body.response,
  };
  const sentToDB = JSON.stringify(answer);

  var options = {
    method: "POST",
    headers: {
      "cache-control": "no-cache",
      "x-apikey": "1cafe281210a9ab5837d477312051f4143e0c",
      "content-type": "application/json",
    },
    body: {
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
      phone: req.body.phone,
      answer: req.body.response,
    },
    json: true,
  };

  axios("https://confirmations-1a40.restdb.io/rest/invites", options)
    .then((result) => {
      console.log("IN THE POST RESPONSE!!!");
      res.send(result.body);
    })
    .catch((error) => console.log("error", error));
});

module.exports = router;
