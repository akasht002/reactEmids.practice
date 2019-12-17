import React from 'react';
import {Input} from './index';
import renderer from 'react-test-renderer';

 test('Input Component Testing', () => {
    const component = renderer.create(
        <Input
            id={'1'}
            autoComplete={false}
            required={false}
            type={'text'}
            placeholder={'Text Input'}
            className={'Text Input'}
            disabled={'false'}
            maxLength={'50'}
            value={'Text Input'}
            readonly={false}>
        </Input>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});