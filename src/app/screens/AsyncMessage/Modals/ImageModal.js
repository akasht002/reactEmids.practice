import React from 'react';
import {  Modal,  ModalBody, } from 'reactstrap';

export class AsyncImgModalTemplate extends React.Component {


    render() {
        return (
                <Modal isOpen={this.props.isOpen} backdrop="static" toggle={this.props.toggle} className={"MsgModal previewImgHolder " + this.props.className} centered={this.props.centered} >
                    <ModalBody className="MsgModalBody">
                        <div className="block-picview">
                        <button type="button" className="close CloseMsgModal" data-dismiss="modal" aria-label="Close" onClick={this.props.toggle}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                        <img className="msgImgPreview" alt="" src={this.props.ModalBody} />
                        
                          </div>
                    </ModalBody>
                </Modal>
        );
    }
}

export default AsyncImgModalTemplate