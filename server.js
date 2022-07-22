require('dotenv').config();
const path = require('path');
const express = require('express');
const axios = require('axios');
const fs = require('fs');

const app = express();

app.use(require('morgan')('tiny'));

app.use(express.json());

// https://ireadyoulearn.info/2020/08/01/use-gzip-compression-with-webpack-to-gain-free-performance-benefits/
app.get('*.js', (req, res, next) => {
  const pathToGzipFile = `${req.url}.gz`;
  try {
    if (fs.existsSync(path.join(path.join(__dirname, '/client/dist'), pathToGzipFile))) {
      req.url += '.gz';

      res.set('Content-Encoding', 'gzip');
      res.set('Content-Type', 'text/javascript');
    }
  } catch (err) {
    console.error(err);
  }

  next();
});

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

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(3000);
