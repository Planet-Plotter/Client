import React, { Component } from 'react';
import './form.css';

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
    const currentYear = this.currentDate()[2];

    const options = [];
    for (let i = 1995; i <= currentYear; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  }

  createMonthOptions = () => {
    const currYear = this.currentDate()[2];
    const selectedYear = this.state.year;
    let maxMonth = 12;
    let minMonth = 1;

    if (selectedYear === currYear) {
      maxMonth = this.currentDate()[1]; //eslint-disable-line
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
    const currYear = this.currentDate()[2];
    const currMonth = this.currentDate()[1];
    const selectedYear = this.state.year;
    const selectedMonth = this.state.month;
    let maxDay = 31;
    let minDay = 1;

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
      if (selectedMonth === currMonth) {
        maxDay = this.currentDate()[0]; // eslint-disable-line
      }
    }

    if (selectedYear === 1995) {
      minDay = 16;
    }

    const options = [];
    for (let i = minDay; i <= maxDay; i++) {
      if ((this.state.year === 1995 && i === minDay) 
      || (this.state.year === currYear && i === maxDay)
        || (this.state.year === i)) {
        console.log('HIT Selected Option Redner');
        options.push(<option selected="selected" key={i} value={i}>{i}</option>);
      // } else if (this.state.year === currYear && i === maxDay) {
      //   options.push(<option selected key={i} value={i}>{i}</option>);
      } else {
        options.push(<option key={i} value={i}>{i}</option>);
      }
    }
    return options;
  }

  currentDate = () => {
    const dateObj = new Date();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    return [day, month, year];
  }

  handleSelectChange = (event) => {
    const { name, value } = event.target;

    const ValidatedDateRequest = () => {
      const [
        currDay,
        currMonth,
        currYear,
      ] = this.currentDate();

      const selectedDate = [this.state.day, this.state.month, this.state.year];
      console.log('Validated BEFORE: ', selectedDate);

      // Check for minimum year
      if (selectedDate[2] === 1995) {
        if (selectedDate[1] < 6) {
          // Set month to minimum month allowed
          selectedDate[1] = 6;
          this.setState({
            month: 6,
          });
        } 
        if (selectedDate[0] < 16) {
          // Set day to minimum day allowed
          selectedDate[0] = 16;
          this.setState({
            day: 16,
          });
        }
      }
      
      // Check for Maximum year based on current date
      if (selectedDate[2] === currYear && selectedDate[1] >= currMonth) {
        // Set month to max month allowed
        selectedDate[1] = currMonth;
        this.setState({
          month: currMonth,
        });
        if (selectedDate[0] > currDay) {
          selectedDate[0] = currDay;
          this.setState({
            day: currDay,
          });
        }
      } 
      console.log('Validated AFTER: ', selectedDate);
      return selectedDate;
    };

    this.setState({
      [name]: parseInt(value, 10),
    }, () => {
      this.props.onComplete(ValidatedDateRequest());
    });
  }


  render() {
    return (
      <div>
        <form
          id="planet-form"
          onSubmit={this.handleSubmit}
        >
          <label htmlFor="select-day">Day</label>
          <select
            key={1}
            id="select-day"
            name="day"
            onChange={this.handleSelectChange}
          >
            {this.createDayOptions()}
          </select>
          
          <label htmlFor="select-month">Month</label>
          <select
            key={2}
            id="select-month" 
            name="month"
            onChange={this.handleSelectChange}
          >
            {this.createMonthOptions()}
          </select>
          
          <label htmlFor="select-year">Year</label>
          <select
            key={3}
            id="select-year"
            name="year"
            onChange={this.handleSelectChange}
          >
            {this.createYearOptions()}
          </select>
        </form>
      </div>
    );
  }
}

export default MyForm;
