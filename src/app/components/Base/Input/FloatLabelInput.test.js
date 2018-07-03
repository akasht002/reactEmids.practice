import React from 'react';
import FloatLabelInput from './FloatLabelInput';
import renderer from 'react-test-renderer';

test('FloatLabelInput Component Jest', () => {
  const component = renderer.create(
    <FloatLabelInput type='text' id='1' label='FirstName' shrink={99} value='John Doe' className='btn'></FloatLabelInput>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

