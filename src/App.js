import React, { Component } from 'react';
import Metronome from './components/Metronome/Metronome';
import './sass/App.scss';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Metronome />
      </div>
    );
  }
}

export default App;
