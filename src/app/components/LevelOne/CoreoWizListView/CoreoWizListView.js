import React from "react";

class CoreoWizListView extends React.Component {
    render() {
        const menuList = this.props.navi.map(
            (menu) => {
                return (
                    <li className={"nav-item py-2 "+menu.status}>
                        <h5 className="font-weight-normal">{menu.title}</h5>
                        <p>{menu.label}</p>
                    </li>
                )
            }
        );

        return (
            <div className="sideContent float-left d-flex align-items-center">
                <ul className="sideNavigation">
                    {menuList}
                </ul>
            </div>
        )
    }
}

export default CoreoWizListView;