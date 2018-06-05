import React, { Component } from 'react';
import TableOne from '../table/table';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Table Test</h1>
        </header>
        <TableOne />
      </div>
    );
  }
}

export default App;
