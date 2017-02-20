const express = require('express');

const app = express();
app.use(express.static('app/public'));


app.get('/', (req, res) => {
  const path = __dirname + '/app/index.html';
  res.sendFile(path);
});

app.listen('1111', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening port 1111');
});
