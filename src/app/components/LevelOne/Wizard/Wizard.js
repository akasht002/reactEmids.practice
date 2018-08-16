import React from "react";
import './style.css'

class Wizard extends React.Component {

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <ul className='WizardList'>
                <li className='WizardItems visited'>Tasks</li>
                <li className='WizardItems active'>Feedback</li>
                <li className='WizardItems'>Summary</li>
                <li className='WizardItems'>Payment</li>
            </ul>
        )
    }
}

export default Wizard;