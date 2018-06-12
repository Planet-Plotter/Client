import React, { Component } from 'react';
import './form.css';

const currentDate = new Date();

class MyForm extends Component {
  state = {
    day: 16,
    month: 6,
    year: 1995,
  }

  componentDidMount = () => {
    this.props.onComplete([this.state.day, this.state.month, this.state.year]);
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
    const selectedYear = this.state.year;
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
    const selectedYear = this.state.year;
    const selectedMonth = this.state.month;
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
    }, ()=> {
      this.props.onComplete([this.state.day, this.state.month, this.state.year]);
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onComplete([this.state.day, this.state.month, this.state.year]);
  }


  render() {
    const currDate = this.currentDate();

    return (
      <div>
        <form
          id="planet-form"
          onSubmit={this.handleSubmit}
        >
          <select
            key={1}
            id="select-day"
            name="day"
            onChange={this.handleSelectChange}
          >
            {this.createDayOptions()}
          </select>
  
          <select
            key={2}
            id="select-month" 
            name="month"
            onChange={this.handleSelectChange}
          >
            {this.createMonthOptions()}
          </select>
          <select
            key={3}
            id="select-year"
            name="year"
            onChange={this.handleSelectChange}
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
