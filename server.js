'use strict';

// Application Dependencies
const express = require('express');
const cors = require('cors');

// Load env vars;
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// App
const app = express();

app.use(cors());

// Get location data
app.get('/location', (req, res) => {
  
});


// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)}
);