import React, { Component } from 'react';
import superagent from 'superagent';

import TableOne from '../table';
import Modal from '../modal';
import Form from '../form';
import './App.css';

class App extends Component {
  // babel-preset - stage - 2 includes class features that implicitly bind to the instance
  // This means no need for a constructor or props here
  state = {
    data: [],
    hdurl: '',
    modalIsOpen: false,
  };

  requestPlanetData = (queryUrl) => {
    console.log('Requested URL: ', queryUrl);
    superagent.get(queryUrl)
      .then(response => {
        this.setState({
          data: response.body,
          hdurl: response.body[0].hdurl,
        });
      })
      .catch(console.log);
  }

  handleSubmit = (values) => {
    let [
      day,
      month,
      year,
     ] = values;

    // Conversion for proper url API requirements in case day and month are less than 2 digits
    day = day.toString();
    month = month.toString();

    if (day.length < 2) day = `0${day}`;
    if (month.length < 2) month = `0${month}`;

    const url = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=${year}-${month}-${day}&end_date=${year}-${month}-${day}`;

    this.requestPlanetData(url);
  }

  handleImgClick = () => {
    console.log('hit img click');

    if (this.state.modalIsOpen) {
      this.setState({
        modalIsOpen: false,
      });
    } else {
      this.setState({
        modalIsOpen: true,
      });
    }
  }

  render() {
    const {
      data, 
    } = this.state;

    let url = null;
    let title = null;
    let explanation = null;

    if (data.length > 0) {
      url = data[0].url;
      title = data[0].title;
      explanation = data[0].explanation;
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Table Test</h1>
        </header>
        {/* <TableOne data={this.state.data} /> */}
        <Form onComplete={this.handleSubmit} />

        <img
          src={url}
          alt={title}
          onClick={this.handleImgClick}
        />

        <p>{explanation}</p>
        <Modal isOpen={this.state.modalIsOpen} hdurl={this.state.hdurl} handleClick={this.handleImgClick} />
      </div>
    );
  }
}

export default App;
