const express = require('express');
const cors = require('cors');
const expressGraphql = require('express-graphql');

const schema = require('./schema/schema');

const app = express();

//cors
app.use(cors());

// dotenv
require('dotenv').config();

//db
const db = require('./helpers/db')();

// middleware 
app.use('/graphql', expressGraphql({
    schema,
    graphiql: true
}));

app.listen(5000, () => {
    console.log('server is running');
})