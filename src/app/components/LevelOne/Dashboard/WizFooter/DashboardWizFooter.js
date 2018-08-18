import React from "react";
import {Button} from "../../../Base";

class DashboardWizFooter extends React.Component {

    render() {
        return (
            <div className="bottomButton">
                        <Button
                            type="button"
                            classname="btn btn-outline-primary mr-auto"
                            label="CANCEL"
                            onClick={this.props.onCancelClick}
                            disable={false}
                        />
                        <div className='ml-auto'>
                        {this.props.diplayPrevButton &&
                            <Button
                                type="button"
                                classname="btn btn-outline-primary mr-3"
                                label="PREVIOUS"
                                onClick={this.props.onPreviousClick}
                                disable={false}
                            />
                        }
                        {this.props.displayNextButton &&
                        <Button
                            type="button"
                            classname="btn btn-primary"
                            label="NEXT"
                            onClick={this.props.onNextClick}
                            disable={false}
                        />}
                        {this.props.displaySubmitButton &&
                        <Button
                            type="button"
                            classname="btn btn-primary"
                            label="POST"
                            onClick={this.props.onSubmitClick}
                            disable={false}
                        />}
                        </div>
            </div>
        )
    }
};

export default DashboardWizFooter;