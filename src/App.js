import React, { Component } from 'react';

import Navbar from './navbar';
import Home from './home.js';
import SymbolDetails from './symboldetails.js';

import {Switch, Route} from 'react-router-dom'

class App extends Component {
  constructor(){
    super();
    this.state = {
      matchedSymbols: []
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar matchedSymbols={this.state.matchedSymbols} setMatchedSymbols={this.setMatchedSymbols} />
        <Switch>
          <Route path="/" exact render={() => (this.state.matchedSymbols.length === 0 ? <Home /> : <div className="container-fluid">
              <div className="row">
                {this.state.matchedSymbols.map(function(e) { return <div className="col-4"  key={e.symbol}><SymbolDetails symbol={e} /></div> })}
              </div>
              </div>
          )} />
          <Route path="/details/:symbol/" render={(routeData) => <SymbolDetails symbol={{symbol: routeData.match.params.symbol}} showFullDetail={true} />} />
          <Route path="*" render={() => <h1>Page Not Found</h1>} />
        </Switch>
        </div>
    );
  }


  setMatchedSymbols = (symbols) => {
    this.setState({matchedSymbols: symbols});
  }

}

export default App;
