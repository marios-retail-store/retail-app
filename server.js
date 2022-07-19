require('dotenv').config();
const path = require('path');
const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.static(path.join(__dirname, '/client/dist')));

app.use(express.json());

app.all('/*', (req, res) => {
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

app.listen(3000);
