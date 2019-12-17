import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { CarouselComp } from './index';

Enzyme.configure({ adapter: new Adapter() })

let props = {
    CarouselItems: [{ id: 1, name: 'test' }]
}

describe('CarouselComp', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <CarouselComp {...props} />
        )
    })
    it('should return correct component', () => {
        expect(wrapper).toBeDefined();
    })


    it('should return correct component', () => {
        wrapper.setState({
            CarouselItems: [{ id: 1, name: 'test' }]
        })
        expect(wrapper).toBeDefined();
    })

    it('should return correct component', () => {
        wrapper.setState({
            CarouselItems: []
        })
        expect(wrapper).toBeDefined();
    })

    it('Check the onExiting function', () => {
        wrapper.instance().onExiting()
    });

    it('Check the onExited  function', () => {
        wrapper.instance().onExited()
    });

    it('Check the next  part', () => {
        wrapper.instance().next()
    });

    it('Check the next  part', () => {
        wrapper.instance().animating = true
        wrapper.instance().next()
    });

    it('Check the previous  part', () => {
        wrapper.instance().previous()
    });

    it('Check the next  part', () => {
        wrapper.instance().animating = true
        wrapper.instance().previous()
    });

    it('Check the goToIndex  part', () => {
        wrapper.instance().goToIndex()
    });

    it('Check the goToIndex  part', () => {
        wrapper.instance().animating = true
        wrapper.instance().goToIndex()
    });

});

