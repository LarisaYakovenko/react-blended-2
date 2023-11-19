import { Backdrop } from 'components/Backdrop/Backdrop';
import { Component } from 'react';

export class Modal extends Component {
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal('');
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal('');
    }
  };
  render() {
    return (
      <Backdrop onClick={this.handleClick}>
        <img src={this.props.url} alt="modalimg" />
      </Backdrop>
    );
  }
}
