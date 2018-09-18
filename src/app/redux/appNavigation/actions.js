import { push } from '../navigation/actions';

export function navigateProfileHeader(url) {
    return (dispatch, getState) => {
        dispatch(push(url));
    }
};