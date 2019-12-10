const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const burnbookService = require('./services/burnbookService');
const path = require('path');

app.use(bodyParser.json());

// http://localhost:3000/api/gossip [GET]
app.get('/api/gossip', async function(req, res) {
  const result = await burnbookService.getAllGossip();
  return res.json(result);
});

// http://localhost:3000/api/gossip [POST]
app.post('/api/gossip', async function(req, res) {
  const result = await burnbookService.createGossip(req.body);
  return res.status(201).json(result);
});

// http://localhost:3000/api/gossip/ [DELETE]
app.delete('/api/gossip', async function(req, res) {
  const result = await burnbookService.deleteAllGossip();
  return res.status(201).json(result);
});

// http://localhost:3000/api/login/ [POST]
app.post('/api/login', async function(req, res) {
  const result = await burnbookService.login(req.body);
  return res.json(result);
});

// http://localhost:3000
app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});