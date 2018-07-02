import React from "react";
import {CoreoWizListView} from '../../';
import {CoreoWizArrayData} from '../../../data/CoreoWizArrayData';

class CoreoWizFlow extends React.Component {
    render() {
        let updatedCoreoWizArray = CoreoWizArrayData.map((wizard) => {
            if (wizard.id === this.props.activeCoreoWiz) {
                wizard.status = 'active';
            } else if (wizard.id < this.props.activeCoreoWiz) {
                wizard.status = 'visited';
            } else {
                wizard.status = '';
            }
            return wizard;
        });

        return (
            <CoreoWizListView navi={updatedCoreoWizArray}/>
        )
    }
}

export default CoreoWizFlow;