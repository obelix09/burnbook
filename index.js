const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const mongoDb = require('mongodb');
const MongoClient = mongoDb.MongoClient;
const connectionString = 'mongodb+srv://dbUser:xoxogossip@cluster0-xxx9b.mongodb.net/BurnBook?retryWrites=true&w=majority';

app.use(bodyParser.json());

// http://localhost:5000 
app.get('/', async function (req, res) {
  return res.sendFile(path.join(__dirname + '/index.html'));
});

// http://localhost:5000/login 
app.get('/login', async function (req, res) {
  return res.sendFile(path.join(__dirname + '/login.html'));
});

// http://localhost:5000/loggedin
app.get('/loggedin', async function (req, res) {
  return res.sendFile(path.join(__dirname + '/loggedin.html'));
});

// http://localhost:5000/flag
app.get('/flag', async function (req, res) {
  return res.sendFile(path.join(__dirname + '/flag.html'));
});

const getPlastics = async (username, password) => {
  const client = await MongoClient.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  if (!client) {
    return;
  }
  const db = client.db('BurnBook');
  const plastics = db.collection('plastics');
  let query = { username: username, password: password};
  let res = await plastics.findOne(query);
  if (!res) {
    return null
  }
  let plastic = {username: res.username, password: res.password}
  return plastic;
}

// http://localhost:5000/api/login [POST]
app.post('/api/login', async (req, res) => {
  console.log("login api")
  const username = req.body.username;
  const password = req.body.password;
  const plastic = await getPlastics(username, password)
  return res.status(200).json(plastic);
});

// http://localhost:5000/api/gossip [GET]
app.get('/api/gossip', async function (req, res) {
  const name = req.query.name;
  try {
    MongoClient.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, async function (err, client) {
      if (err) { throw new Error(err); }
      const db = client.db('BurnBook');
      var myPromise = () => {
        return new Promise((resolve, reject) => {
          db.collection('gossips')
            .find({})
            .toArray(function (err, data) {
              if (err) { reject(err) }
              else { resolve(data) }
            });
        });
      };
      var callMyPromise = async () => {
        var result = await (myPromise());
        return result;
      };
      callMyPromise().then(function (result) {
        client.close();
        res.json(result);
      });
    });
  } catch (e) {
    next(e)
  }
});

// http://localhost:5000/api/gossip?name=bobby [GET]
app.get('/api/gossip/name', async function (req, res) {
  const name = req.query.name;
  try {
    MongoClient.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, async function (err, client) {
      if (err) { throw new Error(err); }
      const db = client.db('BurnBook');
      var myPromise = () => {
        return new Promise((resolve, reject) => {
          db.collection('gossips')
            .find({ name: name })
            .toArray(function (err, data) {
              if (err) { reject(err) }
              else { resolve(data) }
            });
        });
      };
      var callMyPromise = async () => {
        var result = await (myPromise());
        return result;
      };
      callMyPromise().then(function (result) {
        client.close();
        res.json(result);
      });
    });
  } catch (e) {
    next(e)
  }
});

// http://localhost:5000/api/gossip [POST]
app.post('/api/gossip', async function (req, res) {
  const result = await burnbookService.createGossip(req.body);
  return res.status(201).json(result);
});

// http://localhost:5000/api/gossip/ [DELETE]
app.delete('/api/gossip', async function (req, res) {
  const result = await burnbookService.deleteAllGossip();
  return res.status(201).json(result);
});


// http://localhost:5000
app.listen(5000, function () {
  console.log('Server is listening on port 5000');
});