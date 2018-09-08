import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button } from '../../';
import './styles.css';

 class ModalPopup extends Component {
    render() {
        return (
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className} centered={true} >
                    <ModalHeader className={"text-uppercase font-weight-light " + this.props.headerFooter}>Coreo Home</ModalHeader>
                    <ModalBody>
                        <p className="text-center lead pt-4">{this.props.ModalBody}</p>
                        <p className="text-right mt-5">
                            {this.props.btn1 && <Button
                                type="button"
                                classname="btn outline btn-primary mx-2 float-right"
                                label={this.props.btn1}
                                disable={false}
                                onClick={this.props.onConfirm}
                            />}
                            {this.props.btn2 && <Button
                                type="button"
                                classname="btn outline btn-outline-primary mx-2 float-right"
                                label={this.props.btn2}
                                disable={false}
                                onClick={this.props.onCancel}
                            />}
                        </p>
                    </ModalBody>
                    <ModalFooter className={this.props.headerFooter}>
                        <Button className="text-uppercase" color="primary" onClick={this.props.toggle}>Okay</Button>
                    </ModalFooter>
                </Modal>
        );
    }
}

export default ModalPopup;