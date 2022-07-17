const graphql = require('graphql')
const Home = require('../models/homeFurniture')
const { GraphQLObjectType,
        GraphQLString,
        GraphQLList,
        GraphQLSchema
                     } = graphql


//define types of object to use

// Dresser
const dressingTableTYPE = new GraphQLObjectType({
    name: 'dressingTable',
    description: 'this is a dressing table..',
    fields: () => ({
        id: {type: graphql.GraphQLID},
        name: { type: GraphQLString },
        description: { type: GraphQLString }
    })
})

/************************** */

//Cupboard
// const cupBoardType = new GraphQLObjectType({
//     name: 'cupBoard',
//     description: 'this is a cup board..',
//     fields: () => ({
//         id: {type: graphql.GraphQLID},
//         name: { type: GraphQLString},
//         description: { type: GraphQLString}
//     })
// })

/******************* */

// define a way to query for the table info
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'root query',
    fields: () => ({
        /*********GET ALL HOME Dresser********** */
        Dressers: {
            type: new GraphQLList(dressingTableTYPE),
            description: 'This is  a list of all Dressers',
            resolve(parent, args){ 
            //     // parent is for relationship btn objects
            //     // args is what the user requests for
            //     // code to get data from db or else where
                 return Home.find({})
            }
            
        },
          /*********GET ONE AUTHORS********** */
          Dresser:{
            type: dressingTableTYPE,
            description: 'Get single Dresser from db',
            args: {name: {type: GraphQLString}},
            resolve(parent, args){
                return Home.findOne({name: args.name})
                // return Author.findOne({name: args.name})
            }
        }
    })
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addDresser:{
            type: dressingTableTYPE,
            args:{
                name: {type: GraphQLString},
                description: {type: GraphQLString}
            },
            resolve(parent, args){
                let dresser = new Home({
                    name: args.name,
                    description: args.description
                })
              return dresser.save()
            }
        }
    } 
})

const homeSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
module.exports = homeSchema