import React, { Fragment } from "react";
import { CustomTextArea } from "../../../components/Base"


export const AdditionalInformation = props => {
    return (
        <Fragment>
            <div className="feedbackForm form-check">
                <CustomTextArea rows={4}
                    placeholder='Write your description'
                    required={false}
                    className='form-control'
                    maxlength={2000}
                    value={props.additionalDescription}
                    textChange={props.handleAdditionInfo}
                />
                <span className="char-limit-block">500 Character max</span>
            </div>
            <div className='feedbackDesc default-222'>Disclaimer: Please note that this information will be available to Service Providers prior to hiring.</div>
        </Fragment>
    )
}

