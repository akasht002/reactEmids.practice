import { PUSH, REPLACE, GO, GO_BACK, GO_FORWARD, LOCATION_CHANGE } from './constants';
import { Path } from '../../routes';

export const push = (href) => {
  return {
    type: PUSH,
    payload: href,
  }
};
export const replace = (href) => ({
  type: REPLACE,
  payload: href,
});
export const go = (index) => ({
  type: GO,
  payload: index,
});
export const goBack = () => ({
  type: GO_BACK,
});
export const goForward = () => ({
  type: GO_FORWARD,
});
export const locationChange = ({ pathname, search, hash }) => {
  return () => {
    switch (pathname) {
      case Path.verifyContact:
      case Path.setPassword:
        return ({
          type: LOCATION_CHANGE,
          payload: {
            pathname,
            search,
            hash,
          }
        });

      default:
        return ({
          type: LOCATION_CHANGE,
          payload: {
            pathname,
            search,
            hash,
          }
        });
    }
  }
};