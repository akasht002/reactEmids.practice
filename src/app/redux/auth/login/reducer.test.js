import reducer from './reducer'
import { LOGIN } from './bridge'

describe('Auth - Login reducer test case',()=>{
    it("should return the initial state",()=>{
        expect(reducer(undefined, {})).toEqual(
            {
                loading: false,
                error: {
                    message: '',
                    code: ''
                }
            }
        )
    })
    
    it('Should handle the fetch_start/login',()=>{
        expect(reducer([],{
            type: LOGIN.start
        })).toEqual( {"loading": true})
    })

    it('Should handle the fetch_end/login',()=>{
        expect(reducer([],{
            type: LOGIN.end
        })).toEqual( {"loading": false})
    })

    it('Should handle the fetch_failed/login',()=>{
        expect(reducer([],{
            type: LOGIN.failed
        })).toEqual(  {"error": {"code": "", "message": ""}} )
    })

});