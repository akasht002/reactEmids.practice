import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class ModalTemplate extends React.Component {

    render() {
        return (
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className} centered={this.props.centered} backdrop="static" >
                    <ModalHeader className={"text-uppercase font-weight-light " + this.props.headerFooter}>{this.props.modalTitle}</ModalHeader>
                    <ModalBody>{this.props.ModalBody}</ModalBody>
                    <ModalFooter className={this.props.headerFooter}>
                        <Button className="text-uppercase" color="primary" onClick={this.props.toggle}>OK</Button>
                    </ModalFooter>
                </Modal>
        );
    }
};