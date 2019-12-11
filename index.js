const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const burnbookService = require('./services/burnbookService');
const path = require('path');

app.use(bodyParser.json());

//HTML random nickname site
app.get('/', async function(req, res) {
  return res.sendFile(path.join(__dirname+'/index.html'));
});

// http://localhost:3000/api/login [GET]
app.get('/api/login', async function(req, res) {
  return res.sendFile(path.join(__dirname+'/login.html'));
});

// http://localhost:3000/api/login [POST]
app.post('/api/login', async function(req, res){
  console.log("halló");
  return res.status(201).json({bla: "bla"});
});

// http://localhost:3000/api/gossip [GET]
app.get('/api/gossip', async function(req, res) {
  var query = req.query 
  if (Object.keys(query)[0] == "name") {
    console.log("well hello there")
    const result = await burnbookService.getGossipByName(query.name);
    return res.json(result);
  } 
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


// http://localhost:5000
app.listen(5000, function() {
  console.log('Server is listening on port 5000');
});