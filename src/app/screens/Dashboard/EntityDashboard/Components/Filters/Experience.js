import React from 'react';
import InputRange from 'react-input-range';
import "./rangeslider.css";

class Experience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                min: this.props.minExperience,
                max: this.props.maxExperience
            },
        };

    }

    componentWillReceiveProps(nextProps) {
     this.setState({
        value: {
            ...this.state.value,
            min: nextProps.minExperience,
            max: nextProps.maxExperience
          }
     })
    }

    render() {
        return (
            <div className="col-md-12 RangeSliderWidget">
                <div className='RangeLimitIndicator'>
                    <span>0 Yrs</span>
                    <span>50 Yrs</span>
                </div>
                <div className='RangeSliderContent'>
                    <InputRange
                        maxValue={50}
                        minValue={0}
                        formatLabel={value => `${value}`}
                        value={this.state.value}
                        onChange={value => {
                            this.setState({ value: value })
                            this.props.onChangeExperinceSlider(this.state.value)
                        }}
                        onChangeComplete={value => value} />
                        <div className='RangeLimitIndicator textCenter'>
          <span>{this.state.value.min} years - {this.state.value.max} years</span>
        </div>
                </div>
            </div>
        );
    }
}

export default Experience;