const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const burnbookService = require('./services/blackbookService');
const path = require('path');

app.use(bodyParser.json());

// http://localhost:3000/api/gossip [GET]
app.get('/api/gossip', async function(req, res) {
  const result = await burnbookService.getAllGossip();
  return res.json(result);
});

// http://localhost:3000/api/gossip [POST]
// app.post('/api/gossip', function(req, res) {
//   ufoService.createNewUfo(req.body, function(ufo) {
//     return res.status(201).json(ufo);
//   }, function(err) {
//     return res.status(400).json(err);
//   });
// });

// // http://localhost:3000/api/gossip/ [DELETE]
// app.delete('/api/gossip', function(req, res) {
//   const ufoId = req.params.ufoId;
//   ufoService.deleteUfo(ufoId, function() {
//     return res.status(204).send();
//   }, function(err) {
//     return res.status(400).json(err);
//   });
// });

// http://localhost:3000
app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});