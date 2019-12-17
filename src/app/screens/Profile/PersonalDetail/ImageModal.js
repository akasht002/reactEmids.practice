import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class ImageModal extends Component {
    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className} centered={this.props.centered} >
                <ModalHeader toggle={this.props.toggle} className={"font-weight-light asyncModalHeader"}>{this.props.modalTitle}
                </ModalHeader>
                <ModalBody>{this.props.ModalBody}</ModalBody>
                <ModalFooter className={this.props.headerFooter}>
                    <Button className="" disabled={this.props.buttonDisable} color="primary" onClick={this.props.saveImage}>Save</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default ImageModal;