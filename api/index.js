const express = require('express')
const session = require('express-session');
const dotenv = require("dotenv")
const cors = require("cors")
const cron = require('node-cron');
const http = require('http');
const path = require('path');
const index = require('../routers/index');
dotenv.config();
const app = express()
const cookieParser = require('cookie-parser');
const {setupSocket} = require('../socket');
const db = require('../config/db');
const server = http.createServer(app);

app.use(cookieParser());
app.set('trust proxy', true);
require('../services/cleanupInactiveUsers');

app.use(cors())

app.use(
  session({
    secret: 'WSDMKDWK274YXMIWJRW83MMIQMNUR32MUEHEJ',
    resave: false,
    saveUninitialized: false,

  })
);
app.use(express.json());

app.use('/api/v1', index);


// const buildPath = path.join(__dirname, './client','dist')
// app.use(express.static(buildPath))
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname,'./client','dist',"index.html"));
// });

setupSocket(server);
const PORT = 8000 || 8000
server.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
})