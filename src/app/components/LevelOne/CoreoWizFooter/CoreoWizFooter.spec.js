import React from 'react';
import CoreoWizFooter from './CoreoWizFooter';
import renderer from 'react-test-renderer';

test('CoreoWizFooter Component testing', () => {
    const component = renderer.create(
      <CoreoWizFooter></CoreoWizFooter>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });