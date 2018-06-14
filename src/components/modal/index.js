import React, { Component } from 'react';
import PreviousSlider from '../previous-slider';
import NextSlider from '../next-slider';
import CloseButton from '../close-button';

class Modal extends Component {
  componentDidMount() {
    console.log('Modal Mounted');
    import('./modal.css');
  }
  render() {
    return (
      <div
        className="modal"
      >
        <PreviousSlider handlePreviousImg={this.props.handlePreviousImg} />
        <article>
          <h4>{this.props.data.title} - {this.props.data.date}</h4>
          <img
            className="modal-img"
            src={this.props.data.hdurl}
            alt={this.props.text}
          />
        </article>
        <NextSlider handleNextImg={this.props.handleNextImg} />
        <CloseButton closeModal={this.props.closeModal}/>
      </div>
    );
  }
}

export default Modal;
