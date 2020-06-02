const express = require('express');
const expressGraphql = require('express-graphql');

const schema = require('./schema/schema');

const app = express();

// middleware 
app.use('/graphql', expressGraphql({
    schema,
    graphiql: true
}));

app.listen(5000, () => {
    console.log('server is running');
})