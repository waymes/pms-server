const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const router = require('./controllers');
const middlewares = require('./helpers/middlewares');
const config = require('./config');

mongoose.connect(config.DB_URI, { useNewUrlParser: true });

// App setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(middlewares.allowCrossDomain);
router(app);
app.use(middlewares.errorHandler);

// Server setup
const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server is listening on port: ${port}`));