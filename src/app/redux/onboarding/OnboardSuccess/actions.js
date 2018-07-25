
import { push } from '../../navigation/actions';
import {Path} from '../../../routes';

export function continueToProfile(){
    return (dispatch, getState) => {
        dispatch(push(Path.profile));
    }
}
    