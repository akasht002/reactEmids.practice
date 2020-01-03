import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { ResetPasswordSuccess, mapDispatchToProps, mapStateToProps } from './index';

jest.mock('../../../components', () => ({
  LoginCover: 'mockLoginCover'
}))

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();

const props = {
  isLoading: true,
  userType: '',
  onLogin: jest.fn(),
  loadingState: {
    isLoading: true
  }
}

store = mockStore(props);

describe("ResetPasswordSuccess", function () {
  let enzymeWrapper;
  beforeEach(() => {
    enzymeWrapper = shallow(
      <ResetPasswordSuccess dispatch={dispatch} store={store} {...props} />
    )
  })

  it('Check the icon', () => {
    expect(enzymeWrapper.find('[test-restSuccess-body="test-restSuccess-body"]').length).toEqual(1);
  });

  it('Check the mapDispatchToProps fn()', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onLogin();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });

  it('should test mapStateToProps state', () => {
    expect(mapStateToProps(props)).toBeDefined();
  });

  it('Check the onClickButtonLogin function', () => {
    enzymeWrapper.instance().onClickButtonLogin()
  });

});