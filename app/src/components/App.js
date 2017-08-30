import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PostList from './PostList';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={PostList} />
      </div>
    );
  }
}

export default App;