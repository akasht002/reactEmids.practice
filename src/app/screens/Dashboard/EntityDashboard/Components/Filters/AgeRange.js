import React from 'react'
import InputRange from 'react-input-range'
import './rangeslider.css'

class AgeRange extends React.Component {
  render () {
    return (
      <div className='width100 RangeSliderWidget' test-ageRange='test-ageRange'>
      <div className='RangeLimitIndicator'>
          <span>0 Yrs</span>
          <span>120 Yrs</span>
        </div>
        <div className='RangeSliderContent CTFilter'>
          <InputRange
            maxValue={120}
            minValue={0}
            value={{ min: this.props.ageRange && this.props.ageRange.minimumAge, max: this.props.ageRange && this.props.ageRange.maximumAge }}
            onChange={value => {
              this.props.onChangeSlider(value)
            }}
            test-input='test-input'
          />
          <div className='RangeLimitIndicator textCenter'>
          <span>{this.props.ageRange && this.props.ageRange.minimumAge} years - {this.props.ageRange && this.props.ageRange.maximumAge} years</span>
        </div>
        </div>
      </div>
    )
  }
}

export default AgeRange
