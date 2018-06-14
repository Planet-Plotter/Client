import React, { Component } from 'react';
import superagent from 'superagent';

// import TableOne from '../table';
import Modal from '../modal';
import Form from '../form';
import './App.css';
import PreviousSlider from '../previous-slider';
import NextSlider from '../next-slider';


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

    this.setState({
      day,
      month,
      year,
    });

    // Conversion for proper url API requirements in case day and month are less than 2 digits
    day = day.toString();
    month = month.toString();

    if (day.length < 2) day = `0${day}`;
    if (month.length < 2) month = `0${month}`;

    const url = `https://api.nasa.gov/planetary/apod?api_key=UpQHlODpCJ11wBVTPjtMqf9FZ8JS64dbO4MsV2Sa&start_date=${year}-${month}-${day}&end_date=${year}-${month}-${day}`;

    this.requestPlanetData(url);
  }

  handlePreviousImg = () => {
    this.handleSubmit([this.state.day - 1, this.state.month, this.state.year]);
  }

  handleNextImg = () => {
    let {
      month,
      year,
    } = this.state;

    let nextDay = this.state.day + 1;
    // if next nextDay is greater than 29
    // and if current month is  4,6,9,11
    // make next nextDay 1 and +1 month

    if (month === 2) {
      if (nextDay === 29) {
        if (!([1996, 2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028].indexOf(year) > -1)) {
          nextDay = 1;
          month++;
        }
      } else if (nextDay === 30) {
        nextDay = 1;
        month++;
      }
    } else if (nextDay === 31) {
      if ([4, 6, 9, 11].indexOf(month) > -1) {
        nextDay = 1;
        month++;
      }
    } else if (nextDay === 32) {
      nextDay = 1;
      if (month === 12) {
        month = 1;
        year++;
      } else {
        month++;
      }
    }


    this.handleSubmit([nextDay, month, year]);
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

    let url, 
      title, 
      explanation = null;

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
          
          <div id="img-navigation">
            <PreviousSlider handlePreviousImg={this.handlePreviousImg}/>
            <Form onComplete={this.handleSubmit} />
            <NextSlider handleNextImg={this.handleNextImg}/>
          </div>            

          <h5>Click the Image for a Larger View</h5>

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
              handleNextImg={this.handleNextImg}
              handlePreviousImg={this.handlePreviousImg}
            /> : null }
        </main>       
      </div>
    );
  }
}

export default App;
