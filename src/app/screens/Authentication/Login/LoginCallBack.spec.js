import React from 'react';
import renderer from 'react-test-renderer';
import { withRouter } from 'react-router'
import LoginCallBack from './LoginCallBack';

jest.mock('react-router-dom'); 

const Component = () => <LoginCallBack/>
const WrappedComponent = withRouter(Component)

test('Login screen Component Testing', () => {
  it('will render', () => expect(renderer.create(<Component />)).toBeDefined())
  it('will fail', () => renderer.create(<WrappedComponent />))
});

