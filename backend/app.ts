const express = require('express');
const bodyParser = require('body-parser');
const cMongoose = require('mongoose');

const postsRoutes = require('./routes/posts');

const app = express();

cMongoose.set('useNewUrlParser', true);
cMongoose.set('useUnifiedTopology', true);
cMongoose.connect('mongodb+srv://gtxssi:yzZNrYmCof0tnqzr@cluster0.7odjr.mongodb.net/mean-course?retryWrites=true&w=majority')
.then(() => {
  console.log('Connected to database.');
})
.catch(() => {
  console.log('Connection failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use('/posts', postsRoutes);

module.exports = app;

