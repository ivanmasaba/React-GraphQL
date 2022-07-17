const mongoose = require('mongoose');
const path = require('path');

const ImageBasePath = 'uploads';
const opts = { toJSON: { virtuals: true } };

const furnitureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    description: {
        type: String
    },
    imageName: {
        type: String,
        required: true
    }
}, opts)

furnitureSchema.virtual('ImagePathe').get( function(){
    if( this.imageName != null  ){
        return path.join( '/', ImageBasePath, this.imageName )
    }
})

module.exports = mongoose.model( 'Furniture', furnitureSchema )
module.exports.ImageBasePath = ImageBasePath