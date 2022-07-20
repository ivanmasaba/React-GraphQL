if(process.env.NODE_env != 'production'){
    require('dotenv').config()
  }
  
  // import apollo and express server
const { ApolloServer } = require('apollo-server-express');
const { gql } = require('apollo-server-express');
const express = require('express');

// import mongo db
const mongoose = require('mongoose');
const cors = require('cors');
// get schemas
const { typeDefs } = require('./schema/TypeDefs');
const { resolvers } = require('./schema/Resolvers');

// create an express app
const app = express();

// apply middleware to app
app.use(cors({
  origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const startServer = async () =>{
// create an Apollo server
const server = new ApolloServer({ typeDefs, resolvers });
await server.start()
// make express server use the apollo server as midleware
server.applyMiddleware({ app, path: "/graphql" });

// connect to db
mongoose.connect( process.env.DATABASE_URL, {
    useNewUrlParser: true
  } );

  const db = mongoose.connection
db.on( 'error', error => console.error(error) )

db.once( 'open', () => {

console.log( "Connected to mongoose..." ) 

app.listen( process.env.PORT || 4000 , () => {
  console.log( "server running on http://localhost:" + process.env.PORT + "/graphql" );
} )

})

}

startServer();