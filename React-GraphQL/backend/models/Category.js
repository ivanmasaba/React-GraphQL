const mongoose = require('mongoose');
const Furniture = require('./furniture');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

categorySchema.pre('remove', function( next ){
    Furniture.find({ categoryID: this.id }, (err, furniture) => {
        if(err){
            next(err)
        }else if( furniture.length > 0 ){
            next( new Error( 'This category has items in db...' ) ) 
        }else{
            next() 
        }
    } )
})

module.exports = mongoose.model('Category', categorySchema);