import React from "react";
import { CoreoWizFooter, Header } from '../../';
import Help from '../../../assets/HelpDoc/Help.pdf';

class CoreoWizScreen extends React.Component {

    onMenuClick = (menu) => {
        if (menu === 'contact') {
            this.helpDocEl.click();
        }
    }

    render() {
        return (
            <div className="container-fluid p-0 mainWidgetOnboarding onBoarding">
                <Header menuArray={this.props.menus} onClick={this.onMenuClick}/>
                <div className="width-100 mainWidget">
                    {this.props.children}
                    <a ref={(el) => {this.helpDocEl = el}} href = {Help} target = "_blank"></a>
                    <CoreoWizFooter isSubmitDisabled={this.props.isSubmitDisabled} displaySubmitButton={this.props.displaySubmitButton} diplayPrevButton={this.props.displayPrevButton} displayNextButton={this.props.displayNextButton} activeCoreoWiz={this.props.activeCoreoWiz} isNextDisabled={this.props.isNextDisabled} onNextClick={this.props.onNextClick} onSubmitClick={this.props.onSubmitClick} onCancelClick={this.props.onCancelClick} onPreviousClick={this.props.onPreviousClick} />
                </div>
            </div>
        )
    }
}

export default CoreoWizScreen;