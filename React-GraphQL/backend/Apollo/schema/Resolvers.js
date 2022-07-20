const Category = require('../models/Category');
const Furniture = require('../models/furniture');

const resolvers = {

    category:{
        items: async (parent, args) => {
            return Furniture.find({categoryID: parent.id})
        }
    },

    furniture: {
        category: async (parent, args) => {
            return Category.findById(parent.categoryID)
         }
    },
   
    Query: {
        // CATEGORY QUERIES FUNCTIONS
         //  function to get all categories
        categories: async () => {
            return Category.find({})
        },
        //  function to get one category
        category: async (parent, args) => {
            return Category.findById(args.id)
        },

        /******** FURNITURE QUERIES FUNCTIONS ************ */

         //  function to get all categories
         furnitureItems: async () => {
            return Furniture.find({})
        },
        //  function to get one category
        furnitureItem: async (parent, args) => {
            return Furniture.findById(args.id)
        },


    },
};

module.exports = { resolvers };