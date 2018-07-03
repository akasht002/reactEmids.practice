import React from 'react';
import './styles.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class ModalTemplate extends React.Component {
    render() {
        return (
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className} centered={this.props.centered} >
                    <ModalHeader className={"text-uppercase font-weight-light " + this.props.headerFooter}>Coreo Home</ModalHeader>
                    <ModalBody>{this.props.ModalBody}</ModalBody>
                    <ModalFooter className={this.props.headerFooter}>
                        <Button className="text-uppercase" color="primary" onClick={this.props.toggle}>Okay</Button>
                    </ModalFooter>
                </Modal>
        );
    }
}