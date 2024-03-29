import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './styles.css';

 class ModalUserAgreement extends Component {
    render() {
        return (
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className} centered={this.props.centered} >
                    <ModalHeader className={"text-uppercase font-weight-light " + this.props.headerFooter}>{this.props.modalTitle}</ModalHeader>
                    <ModalBody>{this.props.ModalBody}</ModalBody>
                    <ModalFooter className={this.props.headerFooter}>
                        <Button color="primary" onClick={this.props.onClick}>Acknowledge and Accept</Button>
                    </ModalFooter>
                </Modal>
        );
    }
}

export default ModalUserAgreement;