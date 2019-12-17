import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { CoreoWizScreen } from './index';

Enzyme.configure({ adapter: new Adapter() })

let props = {
    menus: [{ id: 1, name: 'test' }],
    isSubmitDisabled: true,
    displaySubmitButton: true,
    displayPrevButton: true,
    displayNextButton: true,
    activeCoreoWiz: 1,
    isNextDisabled: false,
    onNextClick: true,
    onSubmitClick: true,
    onCancelClick: true,
    onPreviousClick: false
}

describe('CoreoWizScreen', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <CoreoWizScreen {...props} />
        )
    })
    it('should return correct component', () => {
        expect(wrapper).toBeDefined();
    })

    it('Check the onMenuClick  function', () => {
        let menu = 'contact'
        wrapper.instance().onMenuClick(menu)
    });

    it('Check the onMenuClick  function', () => {
        let menu = 'test'
        wrapper.instance().onMenuClick(menu)
    });
});

