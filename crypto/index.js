const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const config = require('./config.json');

const app = express();
app.use(cors({ credentials: true, origin: config.origin }));
app.use(cookieParser());
app.use(express.json());

app.listen(config.port, () => {
    console.log('Server started !');
});

app.get('/encryptUser',(_req,res) => res.sendStatus(200))
app.get('/decryptUser',(_req,res) => res.sendStatus(200))