require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(cors());

const router = require(`${__dirname}/src/router`);
app.use(router);

const host = process.env.HOST;
const port = process.env.PORT;

app.listen(port, host, () => {
    console.log('Server is running on port', port);
});
