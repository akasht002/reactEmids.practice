import React from "react";
import { DashboardWizFooter } from '../../';

class DashboardWizScreen extends React.Component {
    render() {
        return (
            <DashboardWizFooter 
            isSubmitDisabled={this.props.isSubmitDisabled} 
            displaySubmitButton={this.props.displaySubmitButton} 
            diplayPrevButton={this.props.displayPrevButton} 
            displayNextButton={this.props.displayNextButton} 
            activeCoreoWiz={this.props.activeCoreoWiz} 
            isNextDisabled={this.props.isNextDisabled} 
            onNextClick={this.props.onNextClick} 
            onSubmitClick={this.props.onSubmitClick} 
            onCancelClick={this.props.onCancelClick} 
            onPreviousClick={this.props.onPreviousClick} 
            />
        )
    }
}

export default DashboardWizScreen;