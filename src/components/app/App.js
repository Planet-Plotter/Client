import React, { Component } from 'react';
import superagent from 'superagent';

import TableOne from '../table';
import './App.css';

class App extends Component {
  // babel-preset - stage - 2 includes class features that implicitly bind to the instance
  // This means no need for a constructor or props here
  state = {
    data: [],
  };

  requestPlanetData(urlQuery) {
    const that = this;
    superagent.get("https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_hostname,ra,dec,st_teff,pl_orbper,st_dist,pl_pnum,pl_masse,pl_rade,pl_disc,pl_telescope,pl_name,pl_mnum,pl_pelink,st_spstr,st_age,&where=pl_disc%3E2017&order=pl_disc&format=JSON&select=count(*)")
      .then(response => {
        console.log(response);
        that.setState({
          data: response.body,
        });
      })
      .catch(console.log);
  }

  queryBuilder(inputArray) {
    // Needs to handle all the options selected and build the request url

  }

  handleSubmit() {
    // handles the form submit and puts the values into an array
    // use form.elements object?
    // let { name, value } = event.target;

    // this.setState({
    //   [name]: value,
    // });

    // const inputArray = {
    //   [name]: value,
    // };
    // return this.queryBuilder(inputArray);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header" onClick={this.requestPlanetData}>
          <h1 className="App-title">React Table Test</h1>
        </header>
        <TableOne data={this.state.data} />
      </div>
    );
  }
}

export default App;
