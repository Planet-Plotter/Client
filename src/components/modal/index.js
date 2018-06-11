import React, { Component } from 'react';
import './modal.css';

class Modal extends Component {
  render() {
    const backGroundStyle = this.props.isOpen ? {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndex: '9998',
      background: 'rgba(0, 0, 0, 0.3)',
    } : null;

    const imgStyle = this.props.isOpen ? {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      background: '#fff',
    } : null;

    const imgSource = this.props.isOpen ? this.props.hdurl : null;

    return (
      <div className="modal" style={backGroundStyle}>
        <img
        style={imgStyle}
          src={imgSource}
          alt={this.props.text}
          onClick={this.props.handleClick}
          />
      </div>
    );
  }
}

export default Modal;
