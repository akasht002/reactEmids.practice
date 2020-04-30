import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  SkillsMultiSelect,
  ModalPopup,
  ProfileModalPopup
} from '../../../components'
import {
  getClinicalCondition,
  addClinicalCondition,
  getSelectedClinicalCondition
} from '../../../redux/patientProfile/ClinicalCondition/actions'
import { difference } from '../../../utils/comparerUtility'
import {SCREENS, PERMISSIONS} from '../../../constants/constants';

export class ClinicalCondition extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isSkillsModalOpen: false,
      selectedSkills: [],
      selectedSkillIds: '',
      disabledSaveBtn: true,
      isAdd: false,
      isDiscardModalOpen: false,
      isChanged: false
    }
    this.oldSelectedValue = ''
  }

  componentDidMount () {
    this.props.getClinicalCondition()
    this.props.getSelectedClinicalCondition()
  }

  componentWillReceiveProps (nextProps) {
    this.oldSelectedValue =
      nextProps.selectedClinicalConditionsList
    let selectedSkillIds = ''

    if (nextProps.selectedClinicalConditionsList) {
      for (const skills of nextProps.selectedClinicalConditionsList) {
        selectedSkillIds === ''
          ? (selectedSkillIds = skills.attributeId)
          : (selectedSkillIds = selectedSkillIds + ',' + skills.attributeId)
      }
    }
    this.setState({ selectedSkills: selectedSkillIds })
  }

  toggleSkills = () => {
    this.setState({
      isSkillsModalOpen: !this.state.isSkillsModalOpen
    })

    if (!this.state.isChanged) {
      this.setState({ isSkillsModalOpen: false, isDiscardModalOpen: false })
    } else {
      this.setState({ isSkillsModalOpen: true, isDiscardModalOpen: true })
    }
  }

  onChangeLanguage = value => {
    this.setState({ selectedSkills: value, disabledSaveBtn: false, isChanged: true })
    if (value) {
      this.setState({ disabledSaveBtn: false })
    }
  }

  addSkills = () => {
    this.props.addClinicalCondition(this.state.selectedSkills)
    this.setState({
      isSkillsModalOpen: !this.state.isSkillsModalOpen,
      disabledSaveBtn: true
    })
  }

  editSkills = () => {
    this.setState({
      isSkillsModalOpen: true,
      isAdd: false,
      isChanged: false
    })
  }

  updateSkills = () => {
    this.props.addClinicalCondition(this.state.selectedSkills)
    this.setState({ isSkillsModalOpen: false, disabledSaveBtn: true })
  }

  reset = () => {
    const previosInitValue = []   
     
    this.oldSelectedValue &&
      this.oldSelectedValue
        .map(function (elem) {
          return previosInitValue.push(elem.attributeId)
        })
       
    const newlyInitValue = []
    const newlySelectedValues = this.state.selectedSkills
    newlyInitValue.push(newlySelectedValues)

    const result = difference(previosInitValue, newlyInitValue)

    this.setState({
      selectedSkills: result,
      isSkillsModalOpen: false,
      isDiscardModalOpen: false,
      disabledSaveBtn: true
    })
  }

  render () {
    let modalTitle
    let modalContent

    let ClinicalConditionOptions =
      this.props.ClinicalConditionList &&
      this.props.ClinicalConditionList.map(clinicalList => {
        return {
          label: clinicalList.attributeName,
          value: clinicalList.attributeId
        }
      })

    let SkillsModalContent = (
      <SkillsMultiSelect
        onselect={this.onChangeLanguage}
        listItems={ClinicalConditionOptions}
        value={this.state.selectedSkills}
        multi
        closeOnSelect
        placeholder='Select clinical conditions'
      />
    )

    let selectedItems =
      this.props.selectedClinicalConditionsList &&
      this.props.selectedClinicalConditionsList.map(item => {
        return (
          <li className={'SPSkillsItems'} key={item.attributeId}>
            {item.attributeName}
          </li>
        )
      })
    this.state.isSkillsModalOpen && this.state.isAdd
      ? (modalTitle = 'Add Clinical Condition')
      : (modalTitle = 'Edit Clinical Condition')

    modalContent = SkillsModalContent

    return (
      <div className='col-md-12 card CardWidget SPSkills'>
        <div className='SPCardTitle d-flex'>
          <h4 className='theme-primary'>Clinical Conditions</h4>
            {(this.props.selectedClinicalConditionsList &&
            this.props.selectedClinicalConditionsList.length > 0
            ? <i
              name={SCREENS.PROFILE + '_' + PERMISSIONS.UPDATE}
              className='SPIconMedium SPIconEdit'
              onClick={this.editSkills}
              />
            : <i
              name={SCREENS.PROFILE + '_' + PERMISSIONS.CREATE}
              className='SPIconLarge SPIconAdd'
              onClick={() =>
                  this.setState({ isSkillsModalOpen: true, isAdd: true })}
          />)}
        </div>
        <div className="SPSkillsContainer width100">
          {this.props.selectedClinicalConditionsList &&
            this.props.selectedClinicalConditionsList.length > 0
            ? <ul className="SPSkillsList theme-primary">
              {selectedItems}
            </ul>
            : <div className='SPNoInfo mb-5'>
              <div className='SPNoInfoContent'>
                <div className='SPInfoContentImage' />
                {
                <span className='SPNoInfoDesc'>
                    Click
                    {' '}
                  <i
                    className='SPIconMedium SPIconAddGrayScale'
                    onClick={() =>
                        this.setState({ isSkillsModalOpen: true, isAdd: true })}
                    />
                  {' '}
                    to add Clinical Condition
                  </span> 
                  
                  }
              </div>
            </div>}
        </div>

        <ProfileModalPopup
          isOpen={this.state.isSkillsModalOpen}
          toggle={this.toggleSkills}
          ModalBody={modalContent}
          className='modal-lg asyncModal LanguagesModal lang-block'
          modalTitle={modalTitle}
          centered
          onClick={this.state.isAdd ? this.addSkills : this.updateSkills}
          disabled={this.state.disabledSaveBtn}
        />

        <ModalPopup
          isOpen={this.state.isDiscardModalOpen}
          toggle={this.reset}
          ModalBody={<span>Do you want to discard the changes?</span>}
          btn1='YES'
          btn2='NO'
          className='modal-sm'
          headerFooter='d-none'
          footer='d-none'
          centered
          onConfirm={() => this.reset()}
          onCancel={() =>
            this.setState({
              isDiscardModalOpen: false
            })}
        />
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getClinicalCondition: () => dispatch(getClinicalCondition()),
    getSelectedClinicalCondition: () =>
      dispatch(getSelectedClinicalCondition()),
    addClinicalCondition: data => dispatch(addClinicalCondition(data))
  }
}

function mapStateToProps (state) {
  const { ClinicalConditionList,selectedClinicalConditionsList  } = state.patientClinicalConditionState
  return {
    ClinicalConditionList,selectedClinicalConditionsList,
    userState: state.profileState.PersonalDetailState,
    personalDetail: state.profileState.PersonalDetailState.personalDetail
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ClinicalCondition)
)
