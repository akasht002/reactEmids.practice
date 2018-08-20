import React from 'react';
import Login from './LoginCallBack';
import renderer from 'react-test-renderer';
import { withRouter } from 'react-router'
import { LoginCallBack } from '..';

jest.mock('react-router-dom'); 

const Component = () => <LoginCallBack/>
const WrappedComponent = withRouter(Component)

test('Login Call Back screen Component Testing', () => {

  it('will render', () => expect(renderer.create(<Component />)).toBeDefined())
  it('will fail', () => renderer.create(<WrappedComponent />))
});

