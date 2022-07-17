const graphql = require('graphql')
const Category = require('../models/Category')
const Furniture = require('../models/furniture')
const { GraphQLObjectType,
        GraphQLID,
        GraphQLString,
        GraphQLList,
        GraphQLSchema
                     } = graphql


//define types of object to use

// categories
const categoryTYPE = new GraphQLObjectType({
    name: 'Category',
    description: 'this is a Category Type',
    fields: () => ({
        id: {type: GraphQLID},
        name: { type: GraphQLString },
        furnitureItems: {
            type: new GraphQLList(furnitureType),
            resolve(parent, args){
                // return Book.findById(parent.author)
                return Furniture.find({categoryID: parent.id})
            }
        }
    })
})

/************************** */

//Furniture items
const furnitureType = new GraphQLObjectType({
    name: 'FurnitureItem',
    description: 'this is a Furniture Type',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        imageName: {type: GraphQLString},
        category: {
            type: categoryTYPE,
            resolve(parent, args){
                    return Category.findById(parent.categoryID)
                 }
        }
    })
})

/******************* */

// define a way to query for the table info
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'this is a RootQuery Type',
    fields: () => ({
        // AUTHOR
        /*********GET ALL Categories********** */
        categories: {
            type: new GraphQLList(categoryTYPE),
            description: 'This is  a list of all categories',
            resolve(parent, args){ 
            //     // parent is for relationship btn objects
            //     // args is what the user requests for
            //     // code to get data from db or else where
                return Category.find({})
            }
            
        },
          /*********GET ONE AUTHORS********** */
          category:{
            type: categoryTYPE,
            description: 'Get single category from db',
            args: { 
                    // name: {type: GraphQLString},
                    id: {type: GraphQLID}
                },
            resolve(parent, args){
                return Category.findById(args.id)
            }
        },
          /*********GET ALL Furniture Items********** */
        furnitureItems:{
            type: new GraphQLList(furnitureType),
            description: 'This is  a list of all Items',
            resolve(){
                return Furniture.find({})
            }
        },
          /*********GET ONE Item********** */
          furnitureItem:{
            type: furnitureType,
            description: 'Get single furniture item from db',
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Furniture.findById(args.id)
            }
        }
    })
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'this is a Mutation Type',
    fields:{
        /*******Create a new Category************ */
        addCategory:{
            type: categoryTYPE,
            description: 'Create a new Category of furniture',
            args:{
                name: {type: GraphQLString}
            },
            resolve(parent, args){
                let category = new Category({
                    name: args.name
                })
              return category.save()
            }
        },

        /***********Update a Category************* */
        updateCategory:{
           type: categoryTYPE,
           description: 'Update a Category of furniture',
           args:{
               id: {type: GraphQLID},
               name: {type: GraphQLString},
           },
           resolve(parent, args){
             return Category.findByIdAndUpdate(args.id, { name: args.name} )
           }
       },

        /***********Delete a Category************* */
        deleteCategory:{
            type: categoryTYPE,
            description: 'Delete a Category of furniture',
            args:{
                id: {type: GraphQLID}
            },
            resolve(parent, args){
              return Category.findByIdAndDelete(args.id)
            }
        },
        /******************** */
        /************************* */

        /*******Create a new furniture item************ */
        addFurnitureItem:{
            type: furnitureType,
            description: 'Create a new item of furniture',
            args:{
                name: {type: GraphQLString},
                categoryID: {type: GraphQLID},
                description: {type: GraphQLString},
                imageName: {type: GraphQLString}
            },
            resolve(parent, args){
                let furniture = new Furniture({  name: args.name,
                                                categoryID: args.categoryID,
                                                description: args.description,
                                                imageName: args.imageName
                                            } )
              return furniture.save()
            }
        },

        /***********Update an item of furniture************* */
        updateFurnitureItem:{
           type: furnitureType,
           description: 'Update an item of furniture',
           args:{
               id: {type: GraphQLID},
               name: {type: GraphQLString},
               categoryID: {type: GraphQLID},
               description: {type: GraphQLString},
               imageName: {type: GraphQLString}
           },
           resolve(parent, args){
             return Furniture.findByIdAndUpdate(args.id, 
                                                { name: args.name,
                                                  categoryID: args.categoryID,
                                                  description: args.description,
                                                  imageName: args.imageName
                                                } )
           }
       },

        /***********Delete an item of furniture************* */
        deleteFurnitureItem:{
            type: furnitureType,
            description: 'Delete an item of furniture',
            args:{
                id: {type: GraphQLID}
            },
            resolve(parent, args){
              return Furniture.findByIdAndDelete(args.id)
            }
        },
    } 
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})