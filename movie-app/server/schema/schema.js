const graphql = require('graphql');
const _ = require('lodash');

// Mongodb Models
const Movie = require('../models/Movie');
const Director = require('../models/Director');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull

} = graphql;



// obje tipleri GET
const MovieType = new GraphQLObjectType({

    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        year: { type: GraphQLInt },
        director: {
            type: DirectorType,
            resolve(parent, args) {
                return Director.findById(parent.directorId);
            }
        }
    })
});

// director tipi GET
const DirectorType = new GraphQLObjectType({

    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        birth: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                //return _.filter(movies, { directorId: parent.id });
                return Movie.find({ directorId: parent.id })
            }
        }
    })
});

// tüm tip tanımlarının olduğu yer
const RootQuery = new GraphQLObjectType({

    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            //veriyi getirecek olan fonksiyon
            resolve(parent, args) {
                //get data
                //return _.find(movies, { id: args.id });
                return Movie.findById(args.id);
            }
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //get data
                //return _.find(directors, { id: args.id });
                return Director.findById(args.id)
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                //return movies
                return Movie.find({});

            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                //return directors
                return Director.find({});
            }
        },

    }
});


// Mutation  POST
const Mutation = new GraphQLObjectType({

    name: 'Mutation',
    fields: {
        addMovie: {
            type: MovieType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString },
                year: { type: new GraphQLNonNull(GraphQLInt) },
                directorId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const movie = new Movie({
                    title: args.title,
                    description: args.description,
                    year: args.year,
                    directorId: args.directorId
                });

                return movie.save();
            }
        },
        addDirector: {
            type: DirectorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                birth: { type: GraphQLInt },
            },
            resolve(parent, args) {
                const director = new Director({
                    name: args.name,
                    birth: args.birth,
                });

                return director.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});