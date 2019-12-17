import { getDataValueArray, getValueOfArray} from '../../../utils/validations'
import expect from 'expect'
import { getModal } from './modal'

jest.mock('../../../services/http', () => ({
    getUserInfo: () => ({
        serviceProviderId:23
    })
}))

 

describe('Service Area Modal',()=>{
    const data = {
        selectedState : {value:'',states:[12,''],addressTypeId:'',zip:35345}
    }
    it('getModal fn ',() => {
        expect(getModal(data,'ADD_DATA')).toBeDefined()
    });

    it('getModal fn ',() => {
        expect(getModal(data,'UPDATE_DATA')).toBeDefined()
    });

    it('getModal fn ',() => {
        expect(getModal(data,'')).toBeDefined()
    });
})

