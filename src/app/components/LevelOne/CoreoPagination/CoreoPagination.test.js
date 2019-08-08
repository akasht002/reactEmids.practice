import React from 'react';
import { CoreoPagination } from '../index';
import renderer from 'react-test-renderer';

test('CoreoPagination Component Testing', () => {
    const component = renderer.create(
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
        </CoreoPagination>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

