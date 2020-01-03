import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { CoreoPagination } from '../index';

Enzyme.configure({ adapter: new Adapter() })

describe('CoreoPagination', () => {
    it('should return correct component', () => {
        const wrapper = shallow(
            <CoreoPagination
                activePage={1}
                itemsCountPerPage={10}
                totalItemsCount={1000}
                pageRangeDisplayed={20}
                itemClass='PaginationItem'
                itemClassFirst='PaginationIcon First'
                itemClassPrev='PaginationIcon Prev'
                itemClassNext='PaginationIcon Next'
                itemClassLast='PaginationIcon Last'>
            </CoreoPagination>
        )
        expect(wrapper).toBeDefined();
    })
});


