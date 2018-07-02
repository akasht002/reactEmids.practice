import {LOCATION_CHANGE} from './constants';

const initialState = {
    pathname: '/',
    search: '',
    hash: '',
  };

  const navigationState = (state = initialState, action) => {
    switch (action.type) {
      case LOCATION_CHANGE:
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  };

  export default navigationState;