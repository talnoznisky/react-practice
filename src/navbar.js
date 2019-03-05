import React, { Component } from 'react';

class Navbar extends Component {

  constructor(){
    console.log('constructed')
    super();
    this.state={
      allSymbols: [],
      searchValue: "",
      matchedSymbols: []
    }
  }

  componentDidMount() {
    console.log('mounted')
      fetch('https://api.iextrading.com/1.0/ref-data/symbols').then((response) => {
          response.json().then((data) => {
              //Setting state on a component should kick-off the update lifecycle
              this.setState(state => { return { allSymbols: data } });
          })
      })
  }
  autoComplete = function(e){
      var placeholder = "Search"
      console.log(this.state.allSymbols[0]);
      console.log("working");
      return placeholder;
  }

  searchOnSubmit = function(e){
    console.log('searching')
    e.preventDefault();
    var searchValue = document.getElementsByName('search')[0].value.toLowerCase();

    this.setState(state => { return { searchValue: searchValue } });
    // var matchedSymbols = this.state.allSymbols.filter(function (e) { return e.symbol.toLowerCase() === searchValue || e.name.toLowerCase().indexOf(searchValue) >= 0 });
    var matchedSymbols = this.state.allSymbols.filter(function (e) { return e.symbol.toLowerCase() === searchValue || e.name.toLowerCase().indexOf(searchValue) >= 0 });

      if(this.props.hasOwnProperty('setMatchedSymbols')){
          this.props.setMatchedSymbols(matchedSymbols);
      }
      this.setState({ matchedSymbols: matchedSymbols });
  }
  

  render() {
    console.log('rendering');
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0" onSubmit={e => this.searchOnSubmit(e)} >
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" name="search" list="symbols" onKeyPress={e => this.autoComplete(e)}/>
            <datalist id="symbols">
                {this.state.matchedSymbols.map(function(e){return <option value={e.symbol}>{e.name}</option> })}
            </datalist>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    );
  }
}

export default Navbar;
