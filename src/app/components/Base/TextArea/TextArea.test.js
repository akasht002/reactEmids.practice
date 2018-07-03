import React from 'react';
import TextArea from './TextArea';
import renderer from 'react-test-renderer';

test('TextArea Component Jest', () => {
  const component = renderer.create(
    <TextArea id='1' placeholder='Write Some Thing' shrink={99} rows='5' className='textarea'></TextArea>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

