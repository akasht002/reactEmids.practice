import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
    getManageConnection
} from '../../../redux/patientProfile/actions'
import { USERTYPES } from '../../../constants/constants';

export class MyConnections extends React.Component {

    componentDidMount() {
        this.props.getManageConnection();
    }

    renderConnections = (members) => {
        return members && members.map((sp, index) => {
            return (
              <li key={index} className='GuardianItems'>
                <div className='GuardianContent'>
                  <img
                    alt={'NO_IMAGE'}
                    key={index}
                    className='GuardianImage'
                    src={
                      sp.image
                        ? sp.image
                        : require('../../../assets/images/Blank_Profile_icon.png')
                    }
                  />
                  <span className='AddGuardianDesc'>
                    <span className='GuardianName'>
                      {sp.firstName} {sp.lastName}
                    </span>
                    <span className='GuardianRelation'>{sp.name}</span>
                  </span>
                </div>
              </li>
            )
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className='col-md-12 card CardWidget SPLanguages'>
                    <div className='SPCardTitle d-flex'>
                        <h4 className='primaryColor'>My Connections</h4>
                    </div>
                    <div className="SPAddGuardianContainer width100">
                        <div className='MyConnectionsContent'>
                            <div className='ConnectionsWidget'>
                                <p className='ConnectionContentHeader'>Individuals</p>
                                <ul className='GuardianList'>
                                    {this.renderConnections(this.props.manageConnection && this.props.manageConnection.filter((item) => {
                                        return item.userType === USERTYPES.PATIENT
                                    }))}
                                </ul>
                            </div>
                        </div>
                        <div className='MyConnectionsContent'>
                            <div className='ConnectionsWidget'>
                                <p className='ConnectionContentHeader'>Guardians</p>
                                <ul className='GuardianList'>
                                    {this.renderConnections(this.props.manageConnection && this.props.manageConnection.filter((item) => {
                                        return item.userType === USERTYPES.GUARDIAN
                                    }))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        getManageConnection: () => dispatch(getManageConnection())
    }
}

export const mapStateToProps = state => {
    return {
        manageConnection: state.patientProfileState.myConnectionList
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MyConnections)
)



