import React, { Component } from 'react';
import superagent from 'superagent';

// import TableOne from '../table';
import Modal from '../modal';
import Form from '../form';
import './App.css';

class App extends Component {
  // babel-preset - stage - 2 includes class features that implicitly bind to the instance
  // This means no need for a constructor or props here
  state = {
    data: [],
    modalIsOpen: false,
  };

  requestPlanetData = (queryUrl) => {
    superagent.get(queryUrl)
      .then(response => {
        this.setState({
          data: response.body[0],
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

    const url = `https://api.nasa.gov/planetary/apod?api_key=UpQHlODpCJ11wBVTPjtMqf9FZ8JS64dbO4MsV2Sa&start_date=${year}-${month}-${day}&end_date=${year}-${month}-${day}`;

    this.requestPlanetData(url);
  }

  toggleModal = () => {
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

    let url, title, explanation = null;

    if (data) {
      url = data.url;
      title = data.title;
      explanation = data.explanation;
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"> React - Astronomy Picture of the Day</h1>
        </header>
        
        {/* <TableOne data={this.state.data} /> */}
        <main>
          <Form onComplete={this.handleSubmit} />
          <h6>Click the Image for a Sliding Gallery</h6>
          {/* TODO: ADD conditonal to have a loading bar if image is loading, else display image */}
          <img //eslint-disable-line
            className="response-img"
            src={url}
            alt={title}
            onClick={this.toggleModal}
          />
          <h4>{title}</h4>
          <p>{explanation}</p>
          { this.state.modalIsOpen ? 
            <Modal
              isOpen={this.state.modalIsOpen}
              data={this.state.data}
              closeModal={this.toggleModal}
              onRequestClose={this.toggleModal}
            /> : null }
        </main>       
      </div>
    );
  }
}

export default App;
