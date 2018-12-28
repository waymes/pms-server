const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const router = require('./controllers');
const config = require('./config');

mongoose.connect(config.DB_URI, { useNewUrlParser: true });

// App setup
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', config.CLIENT_URL);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(allowCrossDomain);
router(app);

// Server setup
const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server is listening on port: ${port}`));