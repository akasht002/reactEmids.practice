import React from 'react';
import {Preloader} from './index';
import renderer from 'react-test-renderer';

 test('Preloader Component Testing', () => {
  const component = renderer.create(
    <Preloader className="Loader"></Preloader>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});