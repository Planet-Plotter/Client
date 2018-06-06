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

  requestPlanetData = (urlQuery) => {
    superagent.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5')
      .then(response => {
        console.log(response.body);
        this.setState({
          data: response.body,
        });
      })
      .catch(console.log);
  }

  queryBuilder = (inputArray) => {
    // Needs to handle all the options selected and build the request url
    // date, count

    //

  }

  handleSubmit = () => {
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
        {/* <TableOne data={this.state.data} /> */}
        <Form />
      </div>
    );
  }
}

export default App;
