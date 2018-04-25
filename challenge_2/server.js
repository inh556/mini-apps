const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan')
const fs = require('fs');

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
  formToCsv(data, function(result) {
    res.send(result);
  })
})

function formToCsv(data, callback) {
  let tHeader = [];
  let contents = [];
  const keys = Object.keys(data);
  for(let key of keys) {
    if(key !== 'children') {
      tHeader.push(key);
    }
  }
  const header = tHeader.join(',');
  contents.push(header);
  function handleContent(data) {
    let content = [];
    tHeader.forEach(function(el){
      content.push(data[el]);
    })
    contents.push(content.join(','));
    if(data.children) {
      data.children.forEach(function(child) {
        handleContent(child)
      });
    }
  }
  handleContent(data);
  //const content = contents.join('\n');
  const response = contents.join('\n');
  callback(response);
}
app.listen(PORT, function(){
  console.log(`App is listening on ${PORT}`);
})