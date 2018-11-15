import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Scrollbars } from '../../../components'
import { NotificationDetails } from './NotificationDetails'
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../../../constants/constants';
import { getVisitNotification, getVisitNotificationCount } from '../../../redux/visitProcessingNotification/VisitNotification/actions';
import './VisitNotification.css';

class VisitNotification extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pageNumber: DEFAULT_PAGE_NUMBER,
            pageSize: DEFAULT_PAGE_SIZE,
        }
    }

    componentDidMount() {
        const data = {
            pageNumber: DEFAULT_PAGE_NUMBER,
            pageSize: DEFAULT_PAGE_SIZE
        } 
        this.props.getVisitNotification({data:data,count:10});
        this.props.getVisitNotificationCount();
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps....', nextProps);
        this.setState({
            rowCount: nextProps.dataCount
        });
    }

    pageNumberChange = (pageNumber) => {
        const data = {
            pageNumber: DEFAULT_PAGE_NUMBER,
            pageSize: DEFAULT_PAGE_SIZE
        } 
        this.props.getVisitNotification({data:data,count:this.state.rowCount});
    }

    render() {
        return (
            <div className={"NotificationsWidget " + this.props.isOpen}>
                <form className="NotificationsWidgetForm">
                    <div className="NotificationsContainer NotificationsTop">
                        <span>Notifications</span>
                        <span className="CloseNotificationsIcon " onClick={this.props.toggle} />
                    </div>
                    <Scrollbars speed={2} smoothScrolling={true} horizontal={false} className="NotificationsContainer NotificationsMiddle">
                        <NotificationDetails
                            visitNotification={this.props.visitNotification}
                        />
                        <ul className="list-group list-group-flush notify" onClick={() => this.pageNumberChange(this.state.pageNumber)}><li className="list-group-item ProfileShowMore">Show more <i className="ProfileIconShowMore"></i></li></ul>
                    </Scrollbars>
                </form>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getVisitNotification: (data) => dispatch(getVisitNotification(data)),
        getVisitNotificationCount: () => dispatch(getVisitNotificationCount())
    }
};

function mapStateToProps(state) {
    return {
        visitNotification: state.visitNotificationState.VisitNotificationState.VisitNotification,
        dataCount: state.visitNotificationState.VisitNotificationState.dataCount,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VisitNotification));