import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './styles.css'

export default class ProfileModalPopup extends React.Component {

    render() {
        return (
            <Modal isOpen={this.props.isOpen} className={this.props.className} centered={true}>
                <ModalHeader toggle={this.props.toggle} className={"font-weight-light profileModalHeader"}>{this.props.modalTitle}
                </ModalHeader>
                <ModalBody>{this.props.ModalBody} </ModalBody>
                <ModalFooter className={this.props.headerFooter}>
                    {this.props.discardBtn ?
                        <Button className="btn btn-outline-primary pull-left" disabled={this.props.disabled} onClick={this.props.onDiscard}>
                            {this.props.discardbuttonLabel ? this.props.discardbuttonLabel : 'Discard'}</Button>
                        :
                        ''
                    }
                    <Button className="" disabled={this.props.disabled} color="primary" onClick={this.props.onClick}>
                        {this.props.buttonLabel ? this.props.buttonLabel : 'Save'}</Button>
                </ModalFooter>
            </Modal>
        );
    }
}