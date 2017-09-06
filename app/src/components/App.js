import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PostList from './PostList';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Route exact path='/' component={PostList} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;