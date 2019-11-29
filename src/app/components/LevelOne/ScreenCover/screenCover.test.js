import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';

import ScreenCover from './ScreenCover';
import { mapDispatchToProps, mapStateToProps } from './ScreenCover';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
  inactiveUser: jest.fn(),
  authState: {
    userState: {
      userData: {
        autoLogoutTime: 10000
      }
    },
    userAgreementState: {
      isEulaUpdated: true
    }
  },
  oidc: {
    user: {
      access_token: '123errrrrrrrrrrrrrrrrrrewww'
    }
  },
  loadingState: {
    isLoading: true
  },
  isLoading: true,
  careTeamImpersination: true,
  careTeamImage: '333333333444444'
}

store = mockStore(defaultState);

const setUp = (props = {}) => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <ScreenCover dispatch={dispatch} store={store} {...props} />
      </MemoryRouter>
    </Provider>
  )
  return wrapper;
};

describe("ScreenCover", function () {
  let wrapper, shallowWrapper;
  beforeEach(() => {
    const props = defaultState;
    wrapper = setUp(props)
    shallowWrapper = shallow(
      <ScreenCover dispatch={dispatch} store={store} {...defaultState} />
    )
  });

  it('Check the ScreenCover', () => {
    expect(shallowWrapper).toBeDefined();
  });

  it('Check mapDispatchToProps actions', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).inactiveUser({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });

  it('Check mapStateToProps', () => {
    const initialState = defaultState;
    expect(mapStateToProps(initialState)).toBeDefined();
  });

  it('Check the ScreenCover', () => {
    shallowWrapper.setProps({
      accessToken: null
    })
    expect(shallowWrapper).toBeDefined();
  });
});