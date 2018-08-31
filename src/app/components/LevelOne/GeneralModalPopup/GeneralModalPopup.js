import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button } from '../../';
import './styles.css'

export default class GeneralModalPopup extends React.Component {

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.onClick} className={this.props.className} centered={true}>
                <ModalHeader toggle={this.props.onClick} className={"font-weight-light profileModalHeader"}>{this.props.modalTitle}
                </ModalHeader>
                <ModalBody>{this.props.ModalBody} </ModalBody>
                <ModalFooter className={this.props.headerFooter}>
                    <Button
                        type="button"
                        classname="btn outline btn-primary mx-2 float-right"
                        label={'Update'}
                        disable={false}
                        onClick={this.props.onClick}
                    />
                </ModalFooter>
            </Modal>
        );
    }
}