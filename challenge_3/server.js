const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3003;
app.use(express.static(path.join(__dirname, './public')));

app.use(bodyParser.json());

// app.get('/client/app.js', (req, res) => {
//   //get
//   res.end();
// });

// app.post('/', (req, res) => {
//   //post
// })

app.listen(PORT, () => {
  console.log(`App listening one ${PORT}`);
})