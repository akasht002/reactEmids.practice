import React from 'react';
import Button from './Button';
import renderer from 'react-test-renderer';

test('Button Component Jest', () => {
  const component = renderer.create(
    <Button type='button' classname='btn' disable='true'></Button>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

