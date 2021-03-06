import React from "react";

class CoreoWizFlow extends React.Component {
    render() {
        const menuList = this.props.coreoWizNavigationData.map(
            (menu) => {
                if (menu.id === this.props.activeFlowId) {
                    menu.status = 'active';
                } else if (menu.id < this.props.activeFlowId) {
                    menu.status = 'visited';
                } else {
                    menu.status = '';
                }
                return (
                    <li key={menu.id} className={"nav-item py-2 "+menu.status}>
                        <h5 className="font-weight-normal">{menu.title}</h5>
                        <p>{menu.label}</p>
                    </li>
                )
            }
        );

        return (
            <div className="sideContent float-left d-flex align-items-center theme-primary-gradient">
                <ul className="sideNavigation">
                    {menuList}
                </ul>
            </div>
        )
    }
}

export default CoreoWizFlow;