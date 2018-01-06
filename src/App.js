import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

import Main from './components/main'

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <Main />
        </MuiThemeProvider>  
      </div>
    );
  }
}

export default App;
