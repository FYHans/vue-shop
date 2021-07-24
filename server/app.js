const path = require('path');

const express = require('express');

const middleware = require('./config/middleware')

const router = require('./router');

const server = require('./server');

const app = express();

middleware(app);

router(app);

server(app);