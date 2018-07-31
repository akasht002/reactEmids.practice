import React from "react";
import { UncontrolledCollapse, CardBody, Card } from 'reactstrap';
import Checkbox from "../ServiceOffered/checkbox"

class ServicesCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkboxes: '',
            collapse: true,
        };
        this.handleClick = this.handleClick.bind(this);
        this.toggleCheck = this.toggleCheck.bind(this);
        this.toggleCollapse = this.toggleCollapse.bind(this);
    };

    handleClick(e) {
        let count = '';
        let checkboxes = '';
        this.state.checkboxes.map((checkbox, i) => {
            if (checkbox.name === e.target.value) {
                count = checkbox.count;
                e.target.checked ? count++ : count--;
                checkboxes = this.state.checkboxes;
                checkboxes[i].count = count;
            }
            return checkboxes;
        });
        this.setState({
            checkboxes
        });
    }

    toggleCollapse() {
        this.setState({
            collapse: false
        });
    }

    toggleCheck(e) {
        let checkboxes = '';
        this.state.checkboxes.map((checkbox, i) => {
            if (checkbox.name === e.target.value) {
                if (e.target.checked) {
                    checkboxes = this.state.checkboxes;
                    checkboxes[i].checked = true;
                    checkboxes[i].count = checkbox.servicesLength;
                } else {
                    checkboxes = this.state.checkboxes;
                    checkboxes[i].checked = false;
                    checkboxes[i].count = 0;
                }
            }
            return checkboxes;
        });
        this.setState({
            checkboxes
        });
        console.log(this.state);
    }

    componentWillMount() {
        let servicesList = [];
        let checkboxName = '';
        let checkedCount = [];
        this.props.name.map((number, i) => {
            checkboxName = 'checkbox' + (i + 1);
            checkedCount = { name: checkboxName, count: 0, checked: false, servicesLength: number.services.length };
            servicesList.push(checkedCount);
        });
        this.setState({ checkboxes: servicesList });
    }

    render() {
        let checkboxName = '';
        let checkboxCount = '';
        let showFirstContentDefault;
        let Checkboxes = this.props.name.map((check, i) => {
            checkboxName = 'checkbox' + (i + 1);
            checkboxCount = 0;
            let contentClassName = '';
            let widgetClassName = '';
            let selectAll = '';
            this.state.collapse && i === 0 ? showFirstContentDefault = '' : showFirstContentDefault = '';
            if (this.props.type === 'edit') {
                widgetClassName = "SPTabWidgetEdit";
                contentClassName = "SPTabContentEdit";
                selectAll = <div className={'width100 selectServiceTypes d-flex'}>
                    <p className={'mr-auto'}>Select the Service Types</p>
                    <div className='form-check ml-auto'>
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" value={checkboxName} />
                            Select All
                            <span className="CheckboxIcon" />
                        </label>
                    </div>
                </div>;
            }

            return (
                <div className={'SPTabWidget ' + widgetClassName}>
                    <UncontrolledCollapse toggler={"#" + checkboxName} className={contentClassName + " SPTabContent " + showFirstContentDefault}>
                        {selectAll}
                        {check.services.map((listService, index) => {
                            if (this.props.type === 'view') {
                                checkboxCount = <span className={'SPServiceCount'}>{index + 1}</span>;
                                return (
                                    <li className={"SPIconServices SPIconServices" + (index + 1)}><span>{listService}</span></li>
                                )
                            } else if (this.props.type === 'edit') {
                                this.state.checkboxes.map((chkBox) => {
                                    if (chkBox.name === checkboxName) {
                                        chkBox.count === 0 ? checkboxCount = '' : checkboxCount =
                                            <span className={'SPServiceCount'}>{chkBox.count}</span>;
                                    }
                                });
                                return (
                                    <div className="form-check form-check-inline selectType SPIconServicesCheckbox">
                                        <input
                                            id={checkboxName + index}
                                            className="form-check-input"
                                            type="checkbox"
                                            value={checkboxName}
                                            onChange={this.handleClick}
                                        />
                                        <label htmlFor={checkboxName + index}
                                            className={"form-check-label SPIconServices" + (index + 1)}>
                                            <span className="text-capitalize">
                                                {listService}
                                            </span>
                                        </label>
                                    </div>
                                )
                            }
                        })}
                    </UncontrolledCollapse>
                    <div className={'SPTabHeader'} id={checkboxName} onClick={this.toggleCollapse}>
                        <div className={'SPTabTitle'}>
                            <h5 className={'SPTabTitleContent'}>{check.label}</h5>
                            {checkboxCount}
                        </div>
                    </div>
                </div>
            )
        });
        return (
            <div className="form-group">
                {Checkboxes}
            </div>
        );
    }
}

export default ServicesCheckbox;