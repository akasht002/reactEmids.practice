import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import moment from "moment";
import { connect } from 'react-redux';
import { ThemeProvider } from '@zendeskgarden/react-theming'
import { SelectField, Select,Item } from '@zendeskgarden/react-select'
import { isFutureDay} from '../../utils/dateUtility'
import { isEntityServiceProvider, getUserInfo } from '../../utils/userUtility';
import { ModalPopup } from '../../components'
import { formatPhoneNumber } from "../../utils/formatName"
import { CONTACT_NOT_FOUND, PHONE_NUMBER_TEXT,VISIT_TYPE } from "../../constants/constants";
import { SERVICE_VISIT_STATUS,START_VISIT } from '../../redux/constants/constants';
import { IN_PROGRESS } from '../Dashboard/constant'
import { USERTYPES } from "../../constants/constants";
import { ORG_SERVICE_PROVIDER_TYPE_ID} from '../../constants/constants';
import { onCreateNewConversation } from "../../redux/asyncMessages/actions";
import {
    getServiceProviderVists,
    getServiceVisitCount,
    getEntityServiceProviderList,
    updateEntityServiceVisit,
    getEntityServiceProviderListSearch,
    setServiceVisitDate,
    goToServiceVisitProcessing,
    goToAssessmentVisitProcessing
  } from "../../redux/dashboard/Dashboard/actions";
  import { saveContextData } from "../../redux/telehealth/actions";
  import { createDataStore } from '../../redux/telehealth/actions'
  import { getEntityProcessingStatus } from '../../utils/validations'
  import { saveScheduleType } from '../../redux/visitSelection/VisitServiceDetails/actions';


class QuickMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAlertModalOpen: false,
            phoneNumber: '',
        };
    }


    onClickVideoConference = item => {
        this.props.setServiceVisitDate(moment(this.state.reportDay))
        if (item) {
          let selectedParticipants = [
            {
              userId: item.coreoHomeUserId,
              participantType: USERTYPES.PATIENT,
              participantId: item.patientId,
              firstName: item.patientFirstName,
              lastName: item.patientLastName,
              thumbNail: item.patientImage
            }
          ];
          this.props.saveContextData(item.patientId);
          this.props.createDataStore(selectedParticipants);
        }
      };


    goToServiceVisits = (data) => {
        this.props.saveScheduleType(data.visitTypeId)
        this.props.setServiceVisitDate(moment(this.state.reportDay))
        if((data.visitStatusId === START_VISIT || data.visitStatusId === IN_PROGRESS) && ( this.props.isStandByModeOn && this.props.isStandByModeOn.isServiceProviderInStandBy)) {
          this.setState({ standByModeAlertMsg: true })
        }
        else  data.visitTypeId !== VISIT_TYPE.assessment 
        ? 
        this.props.goToServiceVisitProcessing(data)
         : 
        this.props.goToAssessmentVisitProcessing(data)
      }

    onClickServiceVisitAction = (conversations) => {
        return (!isFutureDay(conversations.visitDate) && conversations.visitStatusId === START_VISIT) ? '' : this.goToServiceVisits(conversations)
      }

    handlePhoneNumber = data => {
        this.setState({
          isAlertModalOpen: !this.state.isAlertModalOpen,
          phoneNumber: formatPhoneNumber(data.phoneNumber)
        })
      }

      onClickConversation = item => {
        this.props.setServiceVisitDate(moment(this.state.reportDay))
        if (item) {
          let selectedParticipants = [
            {
              userId: item.coreoHomeUserId,
              participantType: USERTYPES.PATIENT,
              participantId: item.patientId
            }
          ];
          let data = {
            participantList: selectedParticipants,
            title: "",
            context: item.patientId
          };
          this.props.createNewConversation(data);
        }
      };

   getOptions = (conversations) => {
    let visitList = SERVICE_VISIT_STATUS.filter((data) =>{
        return (data.id === (conversations && conversations.visitStatusId))
    })
    let list = visitList.length > 0 ? visitList[0] : SERVICE_VISIT_STATUS[0]
    let options = [];
    const data = {
      visitStatusId: conversations.visitStatusId,
      isPaymentModeEnabled: conversations.isPaymentModeEnabled,
    }
    if(isEntityServiceProvider()){
        options = [
          <Item disabled={(!isFutureDay(conversations.visitDate) && conversations.visitStatusId === START_VISIT)} className='ListItem CTDashboard' key='item-4' 
            onClick={(e) => this.onClickServiceVisitAction(conversations)}>
            <i className={conversations.visitStatusId ? list.iconImage: list.iconImage} /> {getEntityProcessingStatus(data)} 
          </Item>,
          <Item className='ListItem CTDashboard' key='item-1'
          onClick={(e) => { this.handlePhoneNumber(conversations) }}>
            <i className='iconPhone' /> Phone Call
          </Item>
        ];
      } else {
        const commonOptions = [<Item className='ListItem CTDashboard' key='item-1'
        onClick={(e) => { this.handlePhoneNumber(conversations) }}>
          <i className='iconPhone' /> Phone Call
        </Item>,
        <Item className='ListItem CTDashboard' key='item-2'
          onClick={(e) => { this.onClickConversation(conversations) }}>
          <i className='iconConversation' /> Conversation
      </Item>,
        <Item className='ListItem CTDashboard' key='item-3'
          onClick={(e) => { this.onClickVideoConference(conversations) }}>
          <i className='iconVideoCon' /> Video Conference
      </Item>]

        !(getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID) ? 
        options = [ 
          <Item disabled={(!isFutureDay(conversations.visitDate) && conversations.visitStatusId === START_VISIT)} className='ListItem CTDashboard' key='item-4' 
          onClick={(e) => this.onClickServiceVisitAction(conversations)}>
                <i className={conversations.visitStatusId && list.iconImage} />
                {getEntityProcessingStatus(data)} 
          </Item>,   
          ...commonOptions,    
        ]
        :
        options = commonOptions;
   }
   return options
   }
   
    render() {
        let options = this.props.conversations && this.getOptions(this.props.conversations)
            return(
                <React.Fragment>
                <div className="options">
                <ThemeProvider>
                    <SelectField>
                    <Select
                        placement='auto'
                        options={options}
                        className='SelectDropDown CTDashboard'
                    />
                    </SelectField>
                </ThemeProvider>
                </div>
                <ModalPopup
                isOpen={this.state.isAlertModalOpen}
                toggle={this.reset}
                ModalBody={<span>{this.state.phoneNumber
                    === null
                    ? CONTACT_NOT_FOUND
                    : `${PHONE_NUMBER_TEXT}
                    ${this.state.phoneNumber}`}</span>}
                btn1='OK'
                className='modal-sm'
                headerFooter='d-none'
                centered='centered'
                onConfirm={() => {
                    this.setState({
                    isAlertModalOpen: false,
                    phoneNumber: ''
                    })
                }
                }
                onCancel={() => {
                    this.setState({
                    isAlertModalOpen: false,
                    phoneNumber: ''
                    })
                }
                }
            />
            <ModalPopup
              isOpen={this.state.standByModeAlertMsg}
              ModalBody={<span> Please turn off the stand-by mode to start the visit. </span>}
              btn1='OK'
              className='modal-sm'
              headerFooter='d-none'
              footer='d-none'
              centered='centered'
              onConfirm={() =>
                this.setState({
                  standByModeAlertMsg: false
                })}
            />
                </React.Fragment>
            )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        getServiceProviderVists: (data,pageNumber,flag) => dispatch(getServiceProviderVists(data,pageNumber,flag)),
        getServiceVisitCount: data => dispatch(getServiceVisitCount(data)),
        getEntityServiceProviderList: () =>
          dispatch(getEntityServiceProviderList()),
        updateEntityServiceVisit: data => dispatch(updateEntityServiceVisit(data, 1)),
        getEntityServiceProviderListSearch: (data) => dispatch(getEntityServiceProviderListSearch(data)),
        setServiceVisitDate: (data) => dispatch(setServiceVisitDate(data)),
        goToServiceVisitProcessing: data => dispatch(goToServiceVisitProcessing(data)),
        saveContextData: (data) => dispatch(saveContextData(data)),
        createNewConversation: data => dispatch(onCreateNewConversation(data)),
        createDataStore: data => dispatch(createDataStore(data)),
        goToAssessmentVisitProcessing: data => dispatch(goToAssessmentVisitProcessing(data)),
        saveScheduleType: (data) => dispatch(saveScheduleType(data))
    }
};

function mapStateToProps(state) {
    return {
        isStandByModeOn: state.profileState.PersonalDetailState.spBusyInVisit, 
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuickMenu));