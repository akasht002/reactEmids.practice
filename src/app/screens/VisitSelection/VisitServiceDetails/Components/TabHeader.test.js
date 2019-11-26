import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TabHeader } from './TabHeader';

Enzyme.configure({ adapter: new Adapter() })

let props = {
    goBack: jest.fn(),
    toggle: jest.fn()
}
describe('TabHeader', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <TabHeader
                list={[
                    {
                        id: '1',
                        label: 'Request'
                    }
                ]}
                activeTab={1}
                {...props}
            />
        )
    })

    it('should return tab_view_list', () => {
        expect(wrapper.find('.tab_view_list').length).toEqual(1);
    })

    it('should return test-goBack', () => {
        expect(wrapper.find('[test-goBack="test-goBack"]').props().onClick())
    })

    it('should return active-tabview', () => {
        expect(wrapper.find('[test-toggle="test-toggle"]').props().onClick())
    })
}); 	
