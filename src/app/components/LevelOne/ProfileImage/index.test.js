import React from 'react';
import {ProfileImage} from './index';
import renderer from 'react-test-renderer';

test('ProfileImage Component testing', () => {
    const component = renderer.create(
      <ProfileImage></ProfileImage>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });