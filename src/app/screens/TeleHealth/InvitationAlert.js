import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AsideScreenCover } from '../ScreenCover/AsideScreenCover';
import {push} from '../../redux/navigation/actions';
import {Path} from '../../routes';
import { joinVideoConference } from '../../redux/telehealth/actions';
import { ModalPopup } from '../../components';
import './styles.css';

class InvitationAlert extends Component { 

    joinVideoConference = () =>{
        let roomNumber = this.props.computedMatch.params.id;
        this.props.joinVideoConference(roomNumber);
    }

    render(){
        return (
            <AsideScreenCover>
               <div className='TeleHealth ProfileHeaderWidget'>
                    <div className='ProfileHeaderTitle'>
                        <h5 className='primaryColor m-0'>Video Conference</h5>
                        <span className="TeleHealthViewParticipants" onClick={() => {}} />
                    </div>
                </div>
                <ModalPopup
                    isOpen={true}
                    ModalBody={<span>You have a new video conference invite.</span>}
                    btn1="Accept"
                    btn2="Reject"
                    className="zh"
                    headerFooter="d-none"
                    centered={true}
                    onConfirm={() => this.joinVideoConference()}
                    onCancel={() => this.props.gotoDashBoard()}
                />
            </AsideScreenCover>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        joinVideoConference: (roomNumber) => dispatch(joinVideoConference(roomNumber)),
        gotoDashBoard: () => dispatch(push(Path.dashboard))
    }
};
  
export default withRouter(connect(null, mapDispatchToProps)(InvitationAlert));
  