import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { GravatarValue, GravatarOption } from './index';
import UserAvatarMultiSelect from './index'

jest.mock('react-select', () => ({
    Select: 'mockSelect'
}))

Enzyme.configure({ adapter: new Adapter() })

describe('UserAvatarMultiSelect ', () => {
    const props = {
        removeSelected: true,
        closeOnSelect: jest.fn(),
        multi: [],
        onChange: jest.fn(),
        optionComponent: {},
        options: [],
        placeholder: '',
        value: '',
        valueComponent: {},
        onSelect: jest.fn(),
        selectedContext : 'Test'
    }
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <UserAvatarMultiSelect  {...props} />
        )
    })
    it('should return correct component', () => {
        expect(wrapper).toBeDefined();
    })

    it('Check the componentDidMount function', () => {
        wrapper.instance().componentDidMount()
    });

    it('Check the componentDidMount function', () => {
        wrapper.setProps({
            selectedContext: ''
        })
        wrapper.instance().componentDidMount()
    });

    it('Check the getInitialState function', () => {
        wrapper.instance().getInitialState()
    });

    it('Check the setValue function', () => {
        wrapper.instance().setValue()
    });

    it('Check the componentDidMount function', () => {
        wrapper.instance().componentDidMount()
    });
});

describe('GravatarValue', () => {
    const props = {
        removeSelected: true,
        closeOnSelect: jest.fn(),
        multi: [],
        onChange: jest.fn(),
        optionComponent: {},
        options: [],
        placeholder: '',
        value: '',
        valueComponent: {},
        onSelect: jest.fn(),
        isDisabled: false,
        onRemove: jest.fn()
    }
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <GravatarValue  {...props} />
        )
    })
    it('should return correct component', () => {
        expect(wrapper).toBeDefined();
    })

    it('should return Select-value-icon', () => {
        const event = { stopPropagation: () => { } }
        expect(wrapper.find('.Select-value-icon').props().onMouseDown(event))
    })

    it('should return Select-value-icon', () => {
        wrapper.setProps({
            isDisabled: true
        })
        const event = { stopPropagation: () => { } }
        expect(wrapper.find('.Select-value-icon').props().onMouseDown(event))
    })
});

describe('GravatarOption ', () => {
    const props = {
        removeSelected: true,
        isFocused: false,
        closeOnSelect: jest.fn(),
        multi: [],
        onChange: jest.fn(),
        optionComponent: {},
        option: {
            title: 'test'
        },
        placeholder: '',
        value: '',
        valueComponent: {},
        onSelect: jest.fn(),
        onFocus: jest.fn(),
        preventDefault: jest.fn(),
        stopPropagation: jest.fn()
    }
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <GravatarOption   {...props} />
        )
    })

    it('should return correct component', () => {
        expect(wrapper).toBeDefined();
    })

    it('Check the handleMouseDown function', () => {
        const event = { preventDefault: () => { }, stopPropagation: () => { } }
        wrapper.instance().handleMouseDown(event)
    });

    it('Check the handleMouseMove function', () => {
        wrapper.instance().handleMouseMove()
    });

    it('Check the handleMouseEnter function', () => {
        wrapper.instance().handleMouseEnter()
    });

    it('Check the handleMouseMove function', () => {
        wrapper.setProps({
            isFocused: true
        })
        wrapper.instance().handleMouseMove()
    });
}); 