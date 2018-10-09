import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import './AboutUs.css'

class AboutUs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen
        };
    };

    toggle() {
        this.setState({
            isOpen: !this.props.isOpen
        });
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className} centered={this.props.centered} >
                <ModalHeader toggle={this.props.toggle} className={"font-weight-light asyncModalHeader"}>{this.props.modalTitle}
                </ModalHeader>
                <ModalBody>
                    {this.props.ModalBody}</ModalBody>
                <ModalFooter className={this.props.headerFooter}>
                    <Button className="" color="primary" onClick={this.props.toggle}>Save</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default withRouter(connect(null, null)(AboutUs));