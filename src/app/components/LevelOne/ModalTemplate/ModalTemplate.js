import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class ModalTemplate extends React.Component {
    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className} centered={this.props.centered} >
                <ModalHeader toggle={this.props.toggle} className={this.props.headerClass}>{this.props.modalTitle}</ModalHeader>
                <ModalBody>{this.props.modalBody}</ModalBody>
                <ModalFooter className={this.props.footerClass}>
                    {this.props.footerBody}
                </ModalFooter>
            </Modal>
        );
    }
}