import React, { Component } from 'react';
import superagent from 'superagent';

import TableOne from '../table';
import Form from '../form';
import './App.css';

class App extends Component {
  // babel-preset - stage - 2 includes class features that implicitly bind to the instance
  // This means no need for a constructor or props here
  state = {
    data: [],
  };

  requestPlanetData = (queryUrl) => {
    superagent.get(queryUrl)
      .then(response => {
        this.setState({
          data: response.body,
        });
      })
      .catch(console.log);
  }

  handleSubmit = (state) => {
    console.log(state);
    let {
      day,
      month,
      year,
    } = state;

    // Conversion for proper url API requirements in case day and month are less than 2 digits
    day = day.toString();
    month = month.toString();

    if (day.length < 2) day = `0${day}`;
    if (month.length < 2) month = `0${month}`;

    const url = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=${year}-${month}-${day}&end_date=${year}-${month}-${day}`;

    this.requestPlanetData(url);
  }

  render() {
    const {
      data, 
    } = this.state;

    let url = null;
    if (data.length > 0) {
      console.log(data[0]);
      url = data[0].url;
    }
    console.log(url);
    return (
      <div className="App">
        <header className="App-header" onClick={this.requestPlanetData}>
          <h1 className="App-title">React Table Test</h1>
        </header>
        {/* <TableOne data={this.state.data} /> */}
        <Form onComplete={this.handleSubmit} />
        <img src={url} alt="test" />
      </div>
    );
  }
}

export default App;
