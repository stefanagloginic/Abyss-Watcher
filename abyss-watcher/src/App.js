import React, { Component } from 'react';
import DisastersParent from './Components/DisastersParent'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>Hello Abyss Watcher!</p>
        <DisastersParent />
      </div>
    );
  }
}

export default App;
