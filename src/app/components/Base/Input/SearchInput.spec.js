import React from 'react';
import { SearchInput } from './index';
import renderer from 'react-test-renderer';

 test('SearchInput Component Testing', () => {
    const component = renderer.create(
        <SearchInput
            id={'1'}
            autoComplete={false}
            placeholder={'Test SearchInput'}
            className={'Test SearchInput'}
            disabled={false}>
        </SearchInput>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});