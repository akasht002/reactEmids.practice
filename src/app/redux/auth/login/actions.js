
import {
    Api,
    API_LOGIN
    } from '../../../services/api';
    
    //actions
    import { push } from '../../navigation/actions';
    
    import { save } from '../../offline/actions';
    
    export const LOGIN = {
        start: 'fetch_start/login',
        end: 'fetch_end/login',
        success: 'fetch_success/login',
        failed: 'fetch_failed/login',
    };
    
    export const loginStart = () => {
        return {
            type: LOGIN.start
        }
    }
    
    export const loginEnd = () => {
        return {
            type: LOGIN.end
        }
    }
    
    export const loginFail = () => {
        return {
            type: LOGIN.failed
        }
    }
    
    export const loginSuccess = (userData) => {
        return {
            type: LOGIN.success,
            userData
        }
    }
    
    export function onLoginSuccess(data){
        return (dispatch, getState) => {
            dispatch(loginSuccess(data))
            save('userData',data);
            dispatch(push('home'));
            // dispatch(routeActions.push('/home'));
        }
    }
    
    export function onLogin() {
        return (dispatch, getState) => {
            dispatch(loginStart())
            Api.get(API_LOGIN, {
                headers: {
                    'Token': 'abcd',
                    'Content-Type':'application/json'
                }
            }).then((resp) => {
                if(resp && resp.data){
                    dispatch(onLoginSuccess(resp.data))
                    dispatch(loginEnd())
                }else{
                    dispatch(loginEnd())
                    dispatch(loginFail())
                }
            }).catch((err) => {
                dispatch(loginEnd())
                dispatch(loginFail())
            })
        }
    }
    
    
    
    
    
    
    
    
    