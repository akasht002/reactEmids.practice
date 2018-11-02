import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  getSelectedClinicalCondition
} from '../../../redux/patientProfile/actions'

class ClinicalCondition extends React.Component {

  componentDidMount () {
    this.props.getSelectedClinicalCondition()
  }

  render () {
    let selectedItems =
      this.props.selectedClinicalConditionsList &&
      this.props.selectedClinicalConditionsList.map(item => {
        return (
          <li className={'SPSkillsItems'} key={item.attributeId}>
            {item.attributeName}
          </li>
        )
      })

    return (
      <div className='col-md-12 card CardWidget SPSkills'>
        <div className='SPCardTitle d-flex'>
          <h4 className='primaryColor'>Clinical Conditions</h4>
        </div>
        <div className="SPSkillsContainer width100">
          {this.props.selectedClinicalConditionsList &&
            this.props.selectedClinicalConditionsList.length > 0
            ? <ul className="SPSkillsList">
              {selectedItems}
            </ul>
            : <div className='SPNoInfo mb-5'>
                <div className='SPNoInfoContent'>
                  <div className='SPInfoContentImage' />
                </div>
              </div>}
        </div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getSelectedClinicalCondition: () =>
      dispatch(getSelectedClinicalCondition())
  }
}

function mapStateToProps (state) {
  return {
    selectedClinicalConditionsList: state.patientProfileState.clinicalConditionList
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ClinicalCondition)
)
