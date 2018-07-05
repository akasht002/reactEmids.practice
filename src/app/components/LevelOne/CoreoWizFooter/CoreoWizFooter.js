import React from "react";
import {Button} from "../../";

class CoreoWizFooter extends React.Component {

    render() {
        return (
            <div className="container-fluid bottom-footer-content p-3 boxShadowTop">
                <div className="row">
                    <div className="col-md-12">
                        <Button
                            type="button"
                            classname="btn outline btn-outline-primary mx-2 float-left"
                            label="CANCEL"
                            onClick={this.props.onCancelClick}
                            disable={false}
                        />
                        {this.props.displayNextButton &&
                        <Button
                            type="button"
                            classname="btn outline btn-primary mx-2 float-right"
                            label="NEXT"
                            onClick={this.props.onNextClick}
                            disable={this.props.isNextDisabled}
                        />}
                        {this.props.displaySubmitButton &&
                        <Button
                            type="button"
                            classname="btn outline btn-primary mx-2 float-right"
                            label="SUBMIT"
                            onClick={this.props.onSubmitClick}
                            disable={this.props.isSubmitDisabled}
                        />}
                        {this.props.diplayPrevButton &&
                            <Button
                                type="button"
                                classname="btn outline btn-outline-primary mx-2 float-right"
                                label="PREVIOUS"
                                onClick={this.props.onPreviousClick}
                                disable={false}
                            />
                        }
                    </div>
                </div>
            </div>
        )
    }
};

export default CoreoWizFooter;