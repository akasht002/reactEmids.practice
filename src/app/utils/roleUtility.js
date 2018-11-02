
import { store } from '../redux/store';
import {PERMISSIONS} from '../constants/constants';
import _ from 'lodash'

export const extractRole = (screen) => {
    const userState =  store && store.getState().authState.userState && store.getState().authState.userState.userData;
    if (userState.roles) {
     var values = Object.keys(userState.roles).filter((key) => { 
         return key === screen;
     });
     if (values.length > 0) {
         return userState.roles[values[0]];
     }
    }
    return {
        Create: false,
        Read: false,
        Update: false,
        Delete: false
    }
}

export const createPermissionName = (screen, permission) => {
    return screen + '_' + permission;
}

export const initialAuthorizePermission = (screen) => {
    Object.keys(PERMISSIONS).map((key) => {
        document.getElementsByName(_.forEach(createPermissionName(screen, PERMISSIONS[key])),(dom) => {
            dom.style.display = 'none';
        });
    });
}

export const authorizePermission = (screen) => {
    initialAuthorizePermission(screen);
    let roles = extractRole(screen);
    Object.keys(roles).map((key) => {
        document.getElementsByName(_.forEach(createPermissionName(screen, key)),(dom) => {
            dom.style.display = roles[key] ? 'inline-block' : 'none';
        });
    });
}
 
export const objectCreationRoles = (roles) => {
    return Object.assign(...roles.map((role) => {
        let permissionsArray = role.permissions.map((permission) => {
            return {
                [permission.permissionName]: permission.isAuthorized
            }
       })
       return {
           [role.moduleName]: Object.assign(...permissionsArray)
       }        
    }));
}
