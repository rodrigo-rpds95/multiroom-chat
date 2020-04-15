const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressSession = require('express-session');

const { ApolloServer } = require('apollo-server-express')
const { importSchema } = require('graphql-import')
const resolvers = require('../app/graphql_api/resolvers')
const schemaPath = './app/graphql_api/schema/index.graphql'

const app = express();

const serverApollo = new ApolloServer({
    typeDefs: importSchema(schemaPath),
    resolvers
})

serverApollo.applyMiddleware({ app, path: '/graphql' })

app.set('view engine', 'pug');
app.set('views', './app/views');
app.locals.basedir = __dirname + '/../app/public';

app.use(express.static(__dirname + '/../app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
	secret: 'anything',
	resave: false,
	saveUninitialized: false
}));

consign()
    .include('./app/routes')
    .then('./app/controllers')
    .then('./app/models')    
    .then('./config/knexfile.js')
    .then('./config/dbConnection.js')
    .then('./config/endConnection.js')
    .into(app);

module.exports = app;