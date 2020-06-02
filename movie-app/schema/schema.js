const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt

} = graphql;

// fake data
const movies = [
    {
        id: '1',
        title: 'The Godfather',
        description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        year: 1972
    },
    {
        id: '2',
        title: 'Scarface',
        description: 'In Miami in 1980, a determined Cuban immigrant takes over a drug cartel and succumbs to greed.',
        year: 1980
    },
    {
        id: '3',
        title: 'Pulp Fiction',
        description: 'The lives of two mob hitmen, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        year: 1994
    }
];

// obje tipleri
const MovieType = new GraphQLObjectType({

    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        year: { type: GraphQLInt }
    })
});

// tüm tip tanımlarının olduğu yer
const RootQuery = new GraphQLObjectType({

    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLString } },
            //veriyi getirecek olan fonksiyon
            resolve(parent, args) {
                //get data

            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});