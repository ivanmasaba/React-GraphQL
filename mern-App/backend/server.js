require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const expressFileupload = require('express-fileupload');

const categoryRoutes = require('./routes/category')
const furnitureRoutes = require('./routes/furniture')

// create express app
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cors())
app.use(expressFileupload({
    createParentPath: true,
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use( express.static( 'public' ) );

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

// routes
app.use('/category', categoryRoutes);
app.use('/furniture', furnitureRoutes);

// connect to db
mongoose.connect( process.env.DATABASE_URL )
.then( () => {
    console.log('Connected to mongoDB');
    // listen for requests
    app.listen(process.env.PORT, () => {
    console.log('listening on port http://localhost:' + process.env.PORT);
} )
})
.catch( (error) => console.log(error) )

