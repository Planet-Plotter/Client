import React, { Component } from 'react';
import './form.css';

class MyForm extends Component {
  // state = {

  // }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} className="planet-form" >
        <input
          type='text'
          name=''
        />        
      </form>

    );
  }
}

export default MyForm;
