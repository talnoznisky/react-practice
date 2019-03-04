import React, { Component } from 'react';
import logo from './flower2.png';
import './App.css';
import Template from './template.js';
import Navbar from './navbar.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Spinning <code>rosejawn.js</code> and share with a babe
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Template/>
        </header>

      </div>

    );
  }
}

export default App;
