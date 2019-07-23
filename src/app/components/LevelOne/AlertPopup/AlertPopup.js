import React, { Component } from 'react'
import { Modal, ModalBody } from 'reactstrap'
import { Button } from '../../'

export class AlertPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isOpen: nextProps.isOpen
    })
  }

  closePopup = () => {
    this.setState({
      isOpen: false
    });
  }

  render() {
    return (
      <Modal
        isOpen={this.state.isOpen}
        toggle={this.props.toggle}
        className={this.props.className}
        centered
      >
        <ModalBody>
          <p className='text-center lead pt-4'><span>{this.props.message}</span></p>
          <p className='text-right mt-5'>
            <Button
              type='button'
              classname={'btn outline btn-primary mx-2 float-right'}
              label={this.props.OkButtonTitle ? this.props.OkButtonTitle : "OK"}
              onClick={this.props.onAcceptClick}
            />
            {this.props.isCancel &&
              <Button
                type='button'
                classname={'btn outline btn-outline-primary mx-2 float-right'}
                label={this.props.CancelButtonTitle ? this.props.CancelButtonTitle : "CANCEL"}
                onClick={this.closePopup}
              />}
          </p>
        </ModalBody>
      </Modal>
    )
  }
}

export default AlertPopup;
