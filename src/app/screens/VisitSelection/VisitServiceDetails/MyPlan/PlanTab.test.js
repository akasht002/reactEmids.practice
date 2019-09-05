import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PlanTab } from './PlanTab';

jest.mock('../../../../components', () => ({
    CoreoPagination: 'mockCoreoPagination'
}))

jest.mock('../../../../utils/userUtility', () => ({
    isEntityUser: () => ({})
}))

Enzyme.configure({ adapter: new Adapter() })

describe('PlanTab', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <PlanTab
                serviceProviderType={'EU'}
                rowPageSize={10}
                statue={35}
            />
        )
    })

    it('should return PlanTab', () => {
        expect(wrapper.find('.TabBody').length).toEqual(1);
    })
}); 	