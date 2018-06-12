import React, { Component } from 'react';
import './modal.css';

class Modal extends Component {
  render() {
    const backGroundStyle = this.props.isOpen ? {
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndex: '9998',
      background: 'rgba(250, 250, 250, 0.95)',
    } : null;

    const imgStyle = this.props.isOpen ? {
      maxHeight: '90%',
      height: 'auto',
      zIndex: '9999',
      background: '#fff',
    } : null;

    const imgSource = this.props.isOpen ? this.props.hdurl : null;

    return (
      <div
        className="modal"
        style={backGroundStyle}
      >
              
        <button>
          <svg className="gallery-arrow arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 200">
            <line x1="100" y1="0" x2="0" y2="100" stroke="black" strokeLinecap="square" />
            <line x1="0" y1="100" x2="100" y2="200" stroke="black" strokeLinecap="square" />
          </svg>

        </button>
        <img
          style={imgStyle}
          src={imgSource}
          alt={this.props.text}
        />
        
        <button>
          <svg className="gallery-arrow arrow-right" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 200">
            <line x1="0" y1="0" x2="100" y2="100" stroke="black" strokeLinecap="square" />
            <line x1="100" y1="100" x2="0" y2="200" stroke="black" strokeLinecap="square" />
          </svg>
        </button>

        <button
          id="button-modal-close"
          onClick={this.props.handleClick}
        >
          <svg className="gallery-arrow arrow-right" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 200 200">
            <line x1="0" y1="0" x2="200" y2="200" stroke="black" strokeLinecap="square" />
            <line x1="200" y1="0" x2="0" y2="200" stroke="black" strokeLinecap="square" />
          </svg>
        </button>

      </div>
    );
  }
}

export default Modal;
