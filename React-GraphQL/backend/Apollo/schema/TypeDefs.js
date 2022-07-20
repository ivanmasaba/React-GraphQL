const { gql } = require('apollo-server-express');

const typeDefs = gql`
    # define types of object to use
    union SearchResult = category | furniture

    # categories
    type category{
            id: String!
            name: String!
            items: [furniture!]!
    }

    #################################

# Furniture items
type furniture{
        id: String!
        name: String!
        categoryID: ID!
        description: String!
        imageName: String!
        category: category!
   
}

#############################


    # Queries
    type Query{
        ######### CATEGORY QUERIES ##########
        categories: [category!]!
        category(id: String!): category!
        ####### FURNITURE QUERIES #########
        furnitureItems: [furniture!]!
        furnitureItem(id: String!): furniture!
    }

    # Mutations

`;

module.exports = { typeDefs };