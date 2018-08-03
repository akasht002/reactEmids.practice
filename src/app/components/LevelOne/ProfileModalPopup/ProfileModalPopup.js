import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './styles.css'

export default class ProfileModalPopup extends React.Component {

    render() {
        return (
            <Modal isOpen={this.props.isOpen} className={this.props.className} centered={true}>
                <ModalHeader toggle={this.props.toggle} className={"font-weight-light asyncModalHeader"}>{this.props.modalTitle}
                </ModalHeader>
                <ModalBody>{this.props.ModalBody} </ModalBody>
                <ModalFooter className={this.props.headerFooter}>
                    <Button className="" disabled={this.props.disabled} color="primary" onClick={this.props.onClick}>Save</Button>
                </ModalFooter>
            </Modal>
        );
    }
}