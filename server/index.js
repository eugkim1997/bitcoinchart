const express = require('express');
const path = require('path');
const axios = require('axios');
var bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public')));

app.get('/bitcoinData', (req, res) => {
  axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?end=${req.query.endDate}&start=${req.query.startDate}`)
    .then((data) => {
      res.status(200).send(data.data.bpi);
    })
    .catch((err) => {
      res.status(400).send(err)
    });
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
