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

// Globals

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

// Get weather data
app.get('/weather', (req, res) => {
  const weatherData = getWeather(req.query.data);
  res.send(weatherData);
});

function getWeather(query) {
  const weatherJson = require('./data/darksky.json');
  const weather = new Weather(weatherJson);
  return weather;
}

function Weather(weatherJson) {
  return weatherJson.daily.data.map(day => {
    return {
      forecast: day.summary,
      time: new Date(day.time * 1000).toDateString()
    }
  });
}


// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)}
);