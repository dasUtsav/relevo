const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const {mongoose} = require('./server/db/connect');

const api = require('./server/routes/api');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', api);
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, ()=>{
  console.log("Server started on port ", port);
})
