import React, { Fragment } from "react";
import { CustomTextArea } from "../../../components/Base"


export const AdditionalInformation = props => {
    return (
        <Fragment>
            <div className="feedbackForm form-check">
                <CustomTextArea rows={4}
                    placeholder='Enter Other Service Provider Name'
                    required={false}
                    className={props.className || 'form-control'}
                    maxlength={500}
                    value={props.additionalDescription}
                    textChange={props.handleAdditionInfo}
                />
            </div>
        </Fragment>
    )
}

