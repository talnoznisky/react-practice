import React, { Component } from 'react';
import * as d3 from "d3";

class SymbolDetails extends Component {
    constructor(){
        super();
        this.state = {
            loaded: false
        }
    }

    componentDidMount(){
        if(!this.state.loaded){
            let endpoint = !this.props.showFullDetail ? 'https://api.iextrading.com/1.0/stock/' + this.props.symbol.symbol + '/company' : 'https://api.iextrading.com/1.0/stock/' + this.props.symbol.symbol + '/batch?types=quote,news,chart,company&range=1m&last=10'

            fetch(endpoint)
                .then((response) => {
                    response.json().then((data) => {
                        if(!this.props.showFullDetail){
                            this.setState(state => {return {loaded: true, data: data }});
                        } else{
                            this.setState(state => {return {loaded: true, data: data.company, quote: data.quote, news: data.news, chart: data.chart,
                            dataset: d3.range(data.chart.length).map(function(d) { return {"y": data.chart[d].close } })
                             }});
                        }
                    })
                })
              }
            }



  render() {


    return (
      <div className="m-1 p-4 bg-dark text-light" >
      {!this.state.loaded ? <progress></progress> : <div>
          <h1>{this.state.data.companyName}</h1>
          <p>{this.state.data.description}</p>
          <dl>
              <dt>Industry</dt>
              <dd>{this.state.data.industry}</dd>
              <dt>Sector</dt>
              <dd>{this.state.data.sector}</dd>
              <dt>CEO</dt>
              <dd>{this.state.data.CEO}</dd>
              <dt>Exchange</dt>
              <dd>{this.state.data.exchange}</dd>
              <dt>As of: {this.state.quote.latestTime}</dt>
              <dt>Opening price:</dt>
              <dd>${this.state.quote.open}</dd>
              <dt>High:</dt>
              <dd>${this.state.quote.high}</dd>
              <dt>Low:</dt>
              <dd>${this.state.quote.low}</dd>
              {console.log(this.state.chart.length)}
              {console.log(this.state.dataset)}
          </dl>

      </div>



    }
      {this.props.showFullDetail ? "" : <a className="btn btn-block btn-primary" href={"/details/" + this.props.symbol.symbol }>{this.props.symbol.name}</a>}

      </div>
    );
  }
}

export default SymbolDetails;
