if(process.env.NODE_env != 'production'){
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const { graphqlHTTP }  = require('express-graphql')
const cors = require('cors')
const schema = require('./schema/categorySchema')

const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true})) 

app.use( "/", graphqlHTTP ({
  schema,
  graphiql: true
}) )




mongoose.connect( process.env.DATABASE_URL, {
  useNewUrlParser: true
} )

const db = mongoose.connection
db.on( 'error', error => console.error(error) )

db.once( 'open', () => {

console.log( "Connected to mongoose..." ) 

app.listen( process.env.PORT || 4000 , () => {
  console.log( "server running on http://localhost:" + process.env.PORT );
} )

})

