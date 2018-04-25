const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan')

const PORT = 3005;
const app =  express();

app.use(bodyParser.json());
app.use(logger('dev'))
app.use(express.static('./client'));

app.get('/', function(req, res) {
  res.send('Hellp world!')
})

app.post('/', function(req, res) {
  // for post method
  const data = JSON.parse(req.body.info);
  // save to file
  res.send(data);
})
app.listen(PORT, function(){
  console.log(`App is listening on ${PORT}`);
})