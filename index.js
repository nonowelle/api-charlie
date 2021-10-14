const express = require("express");
const app = express();
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,content-type, Accept, Authorization"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// add router for all routes
const router = require("./routes/router.js");
app.use("/api", router);

// handle unhandled 404 requests
app.use("*", (req, res) => {
  console.log(`\u001b[31m[ERR] Route does not exists: ${req.baseUrl}`);
});

// start server
app.listen(process.env.PORT, () =>
  console.log(`\x1b[0m[LOG] Server running on port ${process.env.PORT}`)
);
