import React from "react";
import { UncontrolledCollapse } from 'reactstrap';

class ServicesCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkboxes: '',
            collapse: true,
            checked: true,
            selectAll: false,
            count: false
        };
        this.serviceType = [];
    };

    handleClick = (e) => {
        this.serviceType.push({
            serviceTypeId: e.target.id,
            serviceTypeDescription: e.target.value,
            isActive: e.target.checked,
            categoryId: e.target.dataset.id
        })
        this.props.handleClick(this.serviceType);
        this.setState({ checked: !this.state.checked });
    }

    handleClickSelectAll = (check) => {
        // this.setState({
        //     selectAll: !this.state.selectAll,
        //     checked: !this.state.checked
        // });
        console.log(check);
        for (const c of check.services) {
            c.isActive = check.selectAll;
        }
    }

    toggleCollapse = () => {
        this.setState({
            collapse: false
        });
    }

    render() {
        let checkboxName = '';
        let checkboxCount = '';
        let toggleid = '';
        let showFirstContentDefault;

        let Checkboxes = this.props.name && this.props.name.map((check, i) => {

            toggleid = 'toggle' + check.id;

            // {
            //     check.services && check.services.map((serviceType, i) => {
            //         return
            //         checkboxName = serviceType.serviceTypeDescription
            //     })
            // }

            let contentClassName = '';
            let widgetClassName = '';
            let selectAll = '';
            check.selectAll = false;
            this.state.collapse && i === 0 ? showFirstContentDefault = '' : showFirstContentDefault = '';
            if (this.props.type === 'edit') {
                widgetClassName = "SPTabWidgetEdit";
                contentClassName = "SPTabContentEdit";
                selectAll = <div className={'width100 selectServiceTypes d-flex'}>
                    <p className={'mr-auto'}>Select the Service Types</p>
                    <div className='form-check ml-auto'>
                        <label className="form-check-label">
                            <input className="form-check-input"
                                type="checkbox"
                                value={check.selectAll}
                                checked={check.selectAll}
                                onChange={() => {
                                    //check.selectAll = !check.selectAll;
                                    // for (const c of check.services) {
                                    //     c.isActive = check.selectAll;
                                    // }
                                }}
                            />
                            Select All
                            <span className="CheckboxIcon" />
                        </label>
                    </div>
                </div>;
            }

            return (
                <div className={'SPTabWidget ' + widgetClassName}>
                    <UncontrolledCollapse toggler={'#' + toggleid} className={contentClassName + " SPTabContent " + showFirstContentDefault}>
                        <div className={'width100 selectServiceTypes d-flex'}>
                            <p className={'mr-auto'}>Select the Service Types</p>
                            <div className='form-check ml-auto'>
                                <label className="form-check-label">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        value={check.selectAll}
                                        checked={check.selectAll}
                                        onChange={() => {
                                            //check.selectAll = !check.selectAll;
                                            for (const c of check.services) {
                                                c.isActive = check.selectAll;
                                            }
                                            this.setState({checked: true});
                                        }}
                                    />
                                    Select All
                                    <span className="CheckboxIcon" />
                                </label>
                            </div>
                        </div>
                        {check.services.map((listService, index) => {
                            if (this.props.type === 'view') {

                                checkboxCount = <span className={'SPServiceCount'}>{index + 1}</span>;
                                return (
                                    <li className={"SPIconServices SPIconServices" + (index + 1)}><span>{listService}</span></li>
                                )
                            } else if (this.props.type === 'edit') {
                                
                                return (
                                    <div className="form-check form-check-inline selectType SPIconServicesCheckbox">
                                        <input
                                            id={listService.serviceTypeId}
                                            className="form-check-input"
                                            type="checkbox"
                                            value={listService.serviceTypeDescription}
                                            data-id={check.id}
                                            onChange={this.handleClick}
                                            defaultChecked={listService.isActive}
                                        />
                                        <label htmlFor={listService.serviceTypeId}
                                            className={"form-check-label SPIconServices" + (index + 1)}>
                                            <span className="text-capitalize">
                                                {listService.serviceTypeDescription}
                                            </span>
                                        </label>
                                    </div>
                                )
                            }
                        })}
                    </UncontrolledCollapse>
                    <div className={'SPTabHeader'} id={toggleid} onClick={this.toggleCollapse}>
                        <div className={'SPTabTitle'}>
                            <h5 className={'SPTabTitleContent'}>{check.label}</h5>
                            {this.props.type === 'view' ?
                                checkboxCount
                                :
                                ''
                            }
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