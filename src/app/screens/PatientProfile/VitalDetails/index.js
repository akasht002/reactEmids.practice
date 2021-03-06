import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getPatientVitals } from '../../../redux/patientProfile/actions';

export class VitalDetails extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      height: '',
      weight: '',
      phoneNumber: ''
    }
  }

  componentDidMount() {
    this.props.getPatientVitals()
  }

  onSubmit = () => {
    if (
      this.state.height === '' ||
      this.state.heightInvalid ||
      this.state.weight === '' ||
      this.state.weightInvalid ||
      this.state.phoneNumber === '' ||
      this.state.phoneNumberInvalid
    ) {
      this.setState({
        isValid: false
      })
    } else {
      this.props.updatePatientVitals(this.state)
      this.setState({
        isVitalModal: !this.state.isVitalModal
      })
    }
  }

  render() {
    return (
      <Fragment>
        <div className='col-md-12 card CardWidget SPLanguages'>
          <div className='SPCardTitle d-flex vital-block-title'>
            <h4 className='theme-primary'>Vital</h4>
          </div>

          <div className='ConnectionsWidget CoreoWidget vital-block'>
            <p className='CoreoAssociationHeader mb-1'>Height</p>
            <p className="">{this.props.vitalDetails.height} Inches</p>
            <p className='CoreoAssociationHeader mb-1'>Weight</p>
            <p className="">{this.props.vitalDetails.weight} Lbs</p>
          </div>
        </div>
      </Fragment>
    )
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getPatientVitals: () => dispatch(getPatientVitals())
  }
}

export function mapStateToProps(state) {
  return {
    vitalDetails: state.patientProfileState.vitalDetails,
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VitalDetails)
)
