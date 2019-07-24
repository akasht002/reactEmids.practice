import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class ParticipantsListModal extends React.Component {
    render() {
        return (
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className} centered backdrop="static" >
                    <ModalHeader toggle={this.props.toggle} className={"font-weight-light asyncModalHeader"}>{this.props.modalTitle}
                    </ModalHeader>
                    <ModalBody>{this.props.ModalBody}</ModalBody>
                    <ModalFooter className={this.props.headerFooter}>
                        <Button disabled={!this.props.isEnable} color="primary" onClick={this.props.createConversation}>Start Video Conference</Button>
                    </ModalFooter>
                </Modal>
        );
    }
};

export default ParticipantsListModal