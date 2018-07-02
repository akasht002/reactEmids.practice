import React from "react";
import { CoreoWizFooter, Header } from '../../';

class CoreoWizScreen extends React.Component {
    render() {
        return (
            <div className="container-fluid p-0">
                <Header menuArray={this.props.menus} />
                <div className="width-100 mainWidget">
                    <div className="container-fluid mainContent px-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-12 py-5 px-0">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                    <CoreoWizFooter isSubmitDisabled ={this.props.isSubmitDisabled} displaySubmitButton={this.props.displaySubmitButton} diplayPrevButton={this.props.displayPrevButton} displayNextButton={this.props.displayNextButton} activeCoreoWiz={this.props.activeCoreoWiz} isNextDisabled={this.props.isNextDisabled} onNextClick={this.props.onNextClick} onSubmitClick = {this.props.onSubmitClick} onCancelClick={this.props.onCancelClick} onPreviousClick={this.props.onPreviousClick} />
                </div>
            </div>
        )
    }
};

export default CoreoWizScreen;