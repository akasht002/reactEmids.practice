import React from "react";
import {ACTIVE,VISITED} from "../../../../constants/constants";
import './styles.css';
function  DashboardWizFlow (props) {
  
    const menuList = props.VisitProcessingNavigationData.map(
        (menu) => {
            if (menu.id === props.activeFlowId) {
                menu.status = ACTIVE;
            } else if (menu.id < props.activeFlowId) {
                menu.status = VISITED;
            } else {
                menu.status = '';
            }
            return (
                <li key={menu.id} className={"WizardItems "+menu.status}>
                    {menu.title}
                    <p>{menu.label}</p>
                </li>
            )
        }
    );
    
    return (
        <div className="CardContainers WizardWidget">
            <ul className="WizardList">
                {menuList}
            </ul>
        </div>
    )
    
}

export default DashboardWizFlow;