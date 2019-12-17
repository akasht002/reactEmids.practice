import React from 'react';
import {ToggleSwitch} from './index';
import renderer from 'react-test-renderer';

 test('ToggleSwitch Component Testing', () => {
  const component = renderer.create(
    <ToggleSwitch></ToggleSwitch>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});