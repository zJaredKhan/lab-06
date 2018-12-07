'use strict';

// Application Dependencies
const express = require('express');
const cors = require('cors');
const request = require('superagent');

// Load env vars;
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// App
const app = express();

app.use(cors());

// Get location data
app.get('/location', (req, res) => {
  const locationData = searchToLatLong(req.query.data || 'lynwood');
  res.send(locationData);
});

function searchToLatLong(query) {
  const geoData = require('./data/geo.json');
  const location = new Location(query, geoData.results[0]);
  return location;
}

function Location(query, location) {
  this.search_query = query;
  this.formatted_query = location.formatted_address;
  this.latitude = location.geometry.location.lat;
  this.longitude = location.geometry.location.lng;
}


// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)}
);