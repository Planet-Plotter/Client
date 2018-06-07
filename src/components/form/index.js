import React, { Component } from 'react';
import './form.css';

const currentDate = new Date();

class MyForm extends Component {
  // state = {
  //   year: 1995,
  //   month: 6,
  //   day: 16,
  // }

  componentDidMount = () => {
    const currDate = this.currentDate();
    this.setState({
      year:currDate[0],
      month:currDate[1],
      day:currDate[2],
    })
  }

  createYearOptions = () => {
    const currentYear = this.currentDate()[0];

    const options = [];
    for (let i = 1995; i <= currentYear; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  }

  createMonthOptions = () => {
    const currYear = this.currentDate()[0];
    const selectedYear = currYear || this.state.year;
    let maxMonth = 12;
    let minMonth = 1;

    if (selectedYear === currYear) {
      maxMonth = this.currentDate()[1];
    }

    if (selectedYear === 1995) {
      minMonth = 6;
    }

    const options = [];
    for (let i = minMonth; i <= maxMonth; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  }

  createDayOptions = () => {
    const currYear = this.currentDate()[0];
    const currMonth = this.currentDate()[1];
    const selectedYear = currYear || this.state.year;
    const selectedMonth = currMonth || this.state.month;
    let maxDay = 31;
    let minDay = 1;

    // TODO: limit days of month depending on which month is selected
    if ([4, 6, 9, 11].indexOf(selectedMonth) > -1) {
      maxDay = 30;
    } else if (selectedMonth === 2) {
      if ([1996, 2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028].indexOf(selectedYear) > -1) {
        maxDay = 29;
      } else {
        maxDay = 28;
      }
    } else {
      maxDay = 31;
    }

    if (selectedYear === currYear) {
      maxDay = this.currentDate()[2];
    }

    if (selectedYear === 1995) {
      minDay = 16;
    }

    const options = [];
    for (let i = minDay; i <= maxDay; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  }

  currentDate = () => {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    return [year, month, day];
  }

  handleSelectChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: parseInt(value, 10),
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.elements);
    this.props.onComplete(this.state);
  }


  render() {
    const currDate = this.currentDate();
    console.log(typeof currDate[2]);

    return (
      <div>
        <form onSubmit={this.handleSubmit} id="planet-form" >
          <select
            key={1}
            id="select-day"
            name="day"
            onChange={this.handleSelectChange}
            defaultValue={currDate[2]}
          >
            {this.createDayOptions()}
          </select>
  
          <select
            key={2}
            id="select-month" 
            name="month"
            onChange={this.handleSelectChange}
            defaultValue={currDate[1]}
          >
            {this.createMonthOptions()}
          </select>
          <select
            key={3}
            id="select-year"
            name="year"
            onChange={this.handleSelectChange}
            defaultValue={currDate[0]}
          >
            {this.createYearOptions()}
          </select>
      </form>
        <button type="submit" form="planet-form" value="Submit"> Go! </button>
      </div>
    );
  }
}

export default MyForm;
