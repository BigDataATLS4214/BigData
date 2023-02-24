const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /artist.
const artistRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the artists.
artistRoutes.route("/artist").get(function (req, res) {
    let db_connect = dbo.getDb("music_list");
    db_connect
      .collection("artists")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });
  
  // This section will help you get a single record by id
  artistRoutes.route("/artist/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect
        .collection("artists")
        .findOne(myquery, function (err, result) {
          if (err) throw err;
          res.json(result);
        });
  });
  
  module.exports = artistRoutes;