import React from 'react';
import './App.css';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

//components
import MovieList from './components/MovieList';




const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

function App() {
  return (

    <ApolloProvider client={client}>
      <div className="App">
        <MovieList />
      </div>
    </ApolloProvider>

  );
}

export default App;
