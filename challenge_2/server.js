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
  res.send('Hello world!')
})
app.post('/', function(req, res) {
  const data = JSON.parse(req.body.info);
  formToCsv(data, function(result) {
    res.send(result);
  })
})
function formToCsv(data, callback) {
  let tHeader = [];
  let table = [];
  const keys = Object.keys(data);
  for(let key of keys) {
    if(key !== 'children') {
      tHeader.push(key);
    }
  }
  const header = tHeader.join(',');
  table.push(header);
  
  function handleContent(data) {
    let content = [];
    tHeader.forEach(function(el){
      content.push(data[el]);
    })
    table.push(content.join(','));
    if(data.children) {
      data.children.forEach(function(child) {
        handleContent(child)
      });
    }
  }
  handleContent(data);

  const response = table.join('\n');
  callback(response);
}
app.listen(PORT, function(){
  console.log(`App is listening on ${PORT}`);
})