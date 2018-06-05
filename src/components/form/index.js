import React, { Component } from 'react';
import './form.css';

class MyForm extends Component {

  createMonthOptions = () => {
    const options = [];

    for(let i = 1; i <= 12; i++){
      options.push(<option value={i}>{i}</option> )
    }
    return options;
  }


  render() {
    // const monthOptions = this.createMonthOptions().map
    return (
      <form onSubmit={this.props.handleSubmit} className="planet-form" >
        <select id="select-month" name="month">
          {this.createMonthOptions()}
        </select>
      </form>
    );
  }
}

export default MyForm;
