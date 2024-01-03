import { Component } from 'react';
import { ModalStyle, Overlay } from './Modal.styled';

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = event => {
        if (event.code === 'Escape') this.props.onClose();
    };

    handleBackdropClick = event => {
        if (event.target === event.currentTarget) this.props.onClose();
    };

    render() {
        return (
            <Overlay onClick={this.handleBackdropClick}>
                <ModalStyle>
                    <img
                        src={this.props.url}
                        alt={this.props.url}
                        width="800"
                        height="600"
                    />
                </ModalStyle>
            </Overlay>
        );
    }
}

export default Modal;
