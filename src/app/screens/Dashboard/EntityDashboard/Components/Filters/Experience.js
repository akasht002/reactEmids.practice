import React from 'react';
import InputRange from 'react-input-range';
import "./rangeslider.css";

class Experience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            min: this.props.minExperience,
            max: this.props.maxExperience
        };
    }

    onChange = value => {
        this.setState({ value })
        this.props.onChangeExperinceSlider(value)
    }

    render() {
        let value = {
            min: this.props.minExperience,
            max: this.props.maxExperience
        }
        return (
            <div className="col-md-12 RangeSliderWidget">
                <div className='RangeLimitIndicator'>
                    <span>0 Yrs</span>
                    <span>50 Yrs</span>
                </div>
                <div className='RangeSliderContent'>
                    <InputRange
                        test-input='test-input'
                        maxValue={50}
                        minValue={0}
                        formatLabel={value => `${value}`}
                        value={value}
                        onChange={value => this.onChange(value)}
                        onChangeComplete={value => value}
                    />
                    <div className='RangeLimitIndicator textCenter'>
                        <span>{this.props.minExperience} years - {this.props.maxExperience} years</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Experience;