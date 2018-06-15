const express = require('express');

const path = require('path'); //eslint-disable-line
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) { //eslint-disable-line
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);
console.log('Server up and listening on Port 9000...');

