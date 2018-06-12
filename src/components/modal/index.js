import React, { Component } from 'react';
import './modal.css';

class Modal extends Component {
  render() {
    return (
      <div
        className="modal"
      >
              
        <button className="modal-button modal-left" >
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 200">
            <line x1="100" y1="0" x2="0" y2="100" stroke="black" strokeLinecap="square" />
            <line x1="0" y1="100" x2="100" y2="200" stroke="black" strokeLinecap="square" />
          </svg>

        </button>
        <article>
          <h4>{this.props.data.title} - {this.props.data.date}</h4>
          <img
            src={this.props.data.hdurl}
            alt={this.props.text}
          />
        </article>

        
        <button className="modal-button modal-right" >
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 200">
            <line x1="0" y1="0" x2="100" y2="100" stroke="black" strokeLinecap="square" />
            <line x1="100" y1="100" x2="0" y2="200" stroke="black" strokeLinecap="square" />
          </svg>
        </button>

        <button
          className="modal-button modal-close"
          onClick={this.props.closeModal}
        >
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 200 200">
            <line x1="0" y1="0" x2="200" y2="200" stroke="black" strokeLinecap="square" />
            <line x1="200" y1="0" x2="0" y2="200" stroke="black" strokeLinecap="square" />
          </svg>
        </button>

      </div>
    );
  }
}

export default Modal;
