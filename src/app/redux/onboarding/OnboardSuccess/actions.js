
import { push } from '../../navigation/actions';
import {Path} from '../../../routes';

export const OnboardSuccess = {

};


export function continueToProfile(){
    return (dispatch, getState) => {
        dispatch(push(Path.profile));
    }
}
    