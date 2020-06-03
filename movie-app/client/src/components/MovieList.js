import React, { Component } from 'react';

// apollo
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';


const getMoviesQuery = gql`

    {
        movies{
            id,
            title,
            description
        }
    }

`;

class MovieList extends Component {


    render() {
        return (
            <div>
                <ul className="movie-list">
                    <Query query={getMoviesQuery}>
                        {({ loading, error, data }) => {

                            if (loading) return <div>Loading...</div>
                            if (error) return <div>Error.</div>

                            return data.movies.map(movie => (
                                <li key={movie.id}>
                                    {movie.title}
                                </li>
                            ))

                        }}
                    </Query>
                </ul>
            </div>
        )
    }
}

export default MovieList;
