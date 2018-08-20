import React from 'react';
import Login from './index';
import renderer from 'react-test-renderer';
import { withRouter } from 'react-router'

jest.mock('react-router-dom'); 

const Component = () => <Login/>
const WrappedComponent = withRouter(Component)

test('Login screen Component Testing', () => {

  it('will render', () => expect(renderer.create(<Component />)).toBeDefined())
  it('will fail', () => renderer.create(<WrappedComponent />))
});

