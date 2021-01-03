const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/posts', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully!'
  });
});

app.get('/posts', (req, res, next) => {
  const posts = [
    { id: 'da8123812', title: 'first server-side post', content: 'this is the content' },
    { id: '123dawd23', title: 'second server-side post', content: 'this is the content!' }
  ];
  return res.status(200).json({
    message: 'Posts fetched successfully!',
    posts
  });
});

module.exports = app;

