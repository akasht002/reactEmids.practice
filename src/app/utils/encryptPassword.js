import {JSEncrypt} from 'jsencrypt';
import { PUBLIC_KEY } from '../constants/config';

export function encryptPassword(password){
    const encryptData = new JSEncrypt();
    encryptData.setPublicKey(PUBLIC_KEY);
    let encryptedData;
    let toEncrypt;
    for (let i = 0; i < 10; i++) {
        toEncrypt = password;
        encryptedData = encryptData.encrypt(toEncrypt);
        if (!encryptedData.endsWith('==')) {
            break;
        }
    }
    return encryptedData;
}