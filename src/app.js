require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()

const { mongooseConnect } = require('./assets/db');
mongooseConnect()

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

app.use(cors())

const { router } = require('./route');
app.use('/api', router);

app.listen(process.env.PORT, () => console.log(`Listening for connections on port ${process.env.PORT}`));