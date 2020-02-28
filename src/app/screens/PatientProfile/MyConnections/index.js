import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
    getManageConnection
} from '../../../redux/patientProfile/actions'
import { USERTYPES } from '../../../constants/constants';
import { formatContactNumberValue } from '../../../utils/validations';

export class MyConnections extends React.PureComponent {

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
                    <span className='GuardianRelation'>{formatContactNumberValue(sp.contactNumber)}</span>
                  </span>
                </div>
              </li>
            )
        })
    }

    render() {
        return (
            <Fragment>
                <div className='col-md-12 card CardWidget SPLanguages'>
                    <div className='SPCardTitle d-flex pb-0'>
                        <h4 className='theme-primary'>Guardians</h4>
                    </div>
                        <div className='MyConnectionsContent'>
                            <div className='ConnectionsWidget'>
                                <ul className='GuardianList'>
                                    {this.renderConnections(this.props.manageConnection && this.props.manageConnection.filter((item) => {
                                        return item.userType === USERTYPES.GUARDIAN
                                    }))}
                                </ul>
                            </div>
                        </div>
                    </div>
            </Fragment>
        )
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        getManageConnection: () => dispatch(getManageConnection())
    }
}


export function mapStateToProps(state) {
    return {
        manageConnection: state.patientProfileState.myConnectionList
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MyConnections)
)





