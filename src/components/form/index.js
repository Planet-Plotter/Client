import React, { Component } from 'react';
import './form.css';

class MyForm extends Component {
  state = {
    year: 1995,
    month: 1,
    day: 1,
  }
  createYearOptions = () => {
    // need to use date to get current year automatically
    const currentYear = this.currentDate()[0];

    const options = [];
    for (let i = 1995; i <= currentYear; i++) {
      options.push(<option key={i} value={parseInt(i, 10)}>{i}</option>);
    }
    return options;
  }

  createMonthOptions = () => {
    const currYear = this.currentDate()[0];
    const selectedYear = this.state.year;
    let maxMonth = 12;

    if (selectedYear === currYear){
      // limit the max month to current date month
      maxMonth = this.currentDate()[1];
    }

    const options = [];
    for (let i = 1; i <= maxMonth; i++) {
      options.push(<option key={i} value={parseInt(i, 10)}>{i}</option>);
    }
    return options;
  }

  createDayOptions = () => {
    const currYear = this.currentDate()[0];
    const selectedYear = this.state.year || 1995;
    let maxDay = 31;

    // TODO: limit days of month depending on which month is selected

    if (selectedYear === currYear) {
      // limit the max month to current date month
      maxDay = this.currentDate()[2];
    }

    const options = [];
    for (let i = 1; i <= maxDay; i++) {
      options.push(<option key={i} value={parseInt(i, 10)}>{i}</option>);
    }
    return options;
  }

  currentDate = () => {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    // this.setState({
    //   month:month,
    //   day:day,
    //   year:year,
    // });

    return [year, month, day];
  }

  handleSelectChange = (event) => {
    // event.preventDefault();
    const { name, value } = event.target;

    this.setState({
      [name]: parseInt(value, 10),
    });
  }



  render() {
    return (
      <form onSubmit={this.props.handleSubmit} className="planet-form" >
        <select key={10} id="select-month" name="month" onChange={this.handleSelectChange}>
          {this.createMonthOptions()}
        </select>
        <select key={20} id="select-year" name="year" onChange={this.handleSelectChange}>
          {this.createYearOptions()}
        </select>
        <select key={30} id="select-day" name="day" onChange={this.handleSelectChange}>
          {this.createDayOptions()}
        </select>
      </form>
    );
  }
}

export default MyForm;
