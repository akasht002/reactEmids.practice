
import { store } from '../redux/store';

export const extractRole = (screen) => {
    const userState =  store && store.getState().authState.userState;
    if (userState.roles) {
     var values = Object.keys(userState.roles).filter((key) => { 
         return key === screen;
     });
     if (values.length > 0) {
         return userState.roles[values[0]];
     }
    }
    return {
        create: false,
        read: false,
        update: false,
        delete: false
    }
 }


export const authorizePermission = (screen) => {
    let roles = extractRole(screen);
    Object.keys(roles).map((key) => {
        document.getElementsByName(screen + '_' + key).forEach((dom) => {
            dom.style.display = roles[key] ? 'inline-block' : 'none';
        });
    });
 }


 export const objectCreationRoles = (roles) => {
    return Object.assign(roles.map((role) => {
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
