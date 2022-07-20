require('dotenv').config();
const path = require('path');
const express = require('express');
const axios = require('axios');

const app = express();

app.use(require('morgan')('tiny'));

app.use(express.static(path.join(__dirname, '/client/dist')));

app.all('/api/*', (req, res) => {
  req.url = req.url.slice(4); // take off /api
  axios({
    url: req.url,
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp',
    method: req.method,
    data: req.body,
    headers: {
      Authorization: process.env.TOKEN,
    },
  })
    .then((response) => {
      res.status(response.status).send(response.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(3000);
