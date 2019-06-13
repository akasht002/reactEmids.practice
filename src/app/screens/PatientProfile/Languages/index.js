import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  getSelectedLanguages
} from '../../../redux/patientProfile/actions'

export class Languages extends React.Component {

  componentDidMount() {
    this.props.getSelectedLanguages()
  }

  render() {
    let selectedItems =
      this.props.selectedLanguagesList.languages &&
      this.props.selectedLanguagesList.languages.map(item => {
        return (
          <li
            className={'SPSkillsItems CountryIcon ' + item.name}
            key={item.id}
          >
            {item.name}
          </li>
        )
      })


    return (
      <div className='col-md-12 card CardWidget SPLanguages'>
        <div className='SPCardTitle d-flex'>
          <h4 className='primaryColor'>Languages Spoken</h4>
        </div>
        <div className='SPCertificateContainer width100'>
          {this.props.selectedLanguagesList.languages &&
            this.props.selectedLanguagesList.languages.length > 0
            ? <ul className='SPSkillsList'>
              {selectedItems}
            </ul>
            :
            // <div className='SPNoInfo mb-5'>
            //     <div className='SPNoInfoContent'>
            //       <div className='SPInfoContentImage' />
            //     </div>
            //   </div>
            <div className='SPNoInfo'>
              <div className='SPNoInfoContent'>
                <div className='SPInfoContentImage' />
                <span className='SPNoInfoDesc'>No data available</span>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getSelectedLanguages: () => dispatch(getSelectedLanguages())
  }
}

function mapStateToProps(state) {
  return {
    selectedLanguagesList: state.patientProfileState.languageList
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Languages)
)
