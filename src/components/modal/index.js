import React, { Component } from 'react';

class Modal extends Component {
  render() {
    return (
      <div>
        <img src={this.props.hdurl} alt={this.props.text}/>
      </div>
    );
  }
}

export default Modal;