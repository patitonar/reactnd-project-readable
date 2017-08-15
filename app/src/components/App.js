import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' render={() => (
          <p className="App-intro">
            Empty project
          </p>
        )} />
      </div>
    );
  }
}

export default App;
