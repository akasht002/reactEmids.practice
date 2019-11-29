import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import {StopWatch} from './index';

Enzyme.configure({ adapter: new Adapter() })

let props = {
    stopTimer: false,
    duration: 10
}

describe('StarRating', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <StopWatch {...props} />
        )
    })
    it('should return correct component', () => {
        expect(wrapper).toBeDefined();
    })

    it('should return correct component', () => {
        wrapper.instance().componentDidMount()
    })

    it('should return correct componentWillReceiveProps', () => {
        let data = {
            stopTimer: true,
            duration: 11
        }
        wrapper.instance().componentWillReceiveProps(data)
    })

    it('should return correct handleStartClick', () => {
        wrapper.instance().handleStartClick()
    })

    it('should return correct handleStopClick', () => {
        wrapper.instance().handleStopClick()
    })

    it('should return correct handleResetClick', () => {
        wrapper.instance().handleResetClick()
    })

    it('should return correct handleLabClick', () => {
        wrapper.instance().handleLabClick()
    })
});

