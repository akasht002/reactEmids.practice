import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  getPatientCoreoDetails,
  getPatientRiskScore
} from '../../../redux/patientProfile/actions'
import {
  COREO_INFO_NOT_FOUND
} from '../../../constants/constants'

export class CoreoInformation extends React.Component {

  componentDidMount() {
    this.props.getPatientCoreoDetails();
    this.props.getPatientRiskScore();
  }

  emptyDataMessage = (data) => {
    return data ? data : COREO_INFO_NOT_FOUND
  }

  renderDuplicateMpi = () => {
    if((this.props.coreoInformationDetails && this.props.coreoInformationDetails.deletedPatientid 
      && this.props.coreoInformationDetails.deletedPatientid.length > 0)) {
        return `, Duplicate - Refer to Coreo MPI: ${this.props.coreoInformationDetails.deletedPatientid.toString()}`;
      }
    else {
      return null
    }  
  }

  render() {
    return (
      <Fragment>
        <div className='col-md-12 card CardWidget SPLanguages'>
          <div className='SPCardTitle d-flex'>
            <h4 className='theme-primary'>Coreo Association</h4>
          </div>

          <div className='ConnectionsWidget CoreoWidget'>
            <p className='CoreoAssociationHeader mb-1'>Coreo ID </p>
            <p>{this.emptyDataMessage(this.props.coreoInformationDetails.mpi)}{this.renderDuplicateMpi()}</p>
            <p className='CoreoAssociationHeader mb-1'>Subscriber ID</p>
            <p>{this.emptyDataMessage(this.props.coreoInformationDetails.memberId)}</p>
            <p className='CoreoAssociationHeader mb-1'>EMR ID</p>
            <p>{this.emptyDataMessage(this.props.coreoInformationDetails.emrId)}</p>
            <p className='CoreoAssociationHeader mb-1'>Attributed Provider</p>
            <p>{this.emptyDataMessage(this.props.coreoInformationDetails.attributeProvider)}</p>
            <p className='CoreoAssociationHeader mb-1'>Risk Group</p>
            <p>{this.emptyDataMessage(this.props.riskScore.riskGroup)}</p>
            <p className='CoreoAssociationHeader mb-1'>Contract</p>
            <p>
              {this.props.coreoInformationDetails && this.props.coreoInformationDetails.memberships &&
                this.props.coreoInformationDetails.memberships.map(contract => {
                  return contract.membershipName;
                })
              }
              {(this.props.coreoInformationDetails.planName ? (' - ' + this.props.coreoInformationDetails.planName) : '')}
            </p>
            <p className='CoreoAssociationHeader mb-1'>Employeer Name</p>
            <p>{COREO_INFO_NOT_FOUND}</p>
          </div>
        </div>
      </Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPatientCoreoDetails: () => dispatch(getPatientCoreoDetails()),
    getPatientRiskScore: () => dispatch(getPatientRiskScore()),
  }
}

function mapStateToProps(state) {
  return {
    coreoInformationDetails: state.patientProfileState.coreoInformationDetails,
    riskScore: state.patientProfileState.riskScore,
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CoreoInformation)
)
