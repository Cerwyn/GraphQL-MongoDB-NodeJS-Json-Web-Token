const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const Auth = require('./middleware/auth');

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use(Auth);

app.use(
    '/graphql',
    graphqlHttp({
      schema: graphQlSchema,
      rootValue: graphQlResolvers,
      graphiql: true
    })
  );

  mongoose
  .connect(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?authSource=admin`
  )
  .then(() => {
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });