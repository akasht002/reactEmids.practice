import reducer from './reducer'
import { LOGOUT } from './bridge'

describe('Auth - Logout reducer test case',()=>{
    it("should return the initial state",()=>{
        expect(reducer(undefined, {})).toEqual(
            {
                userData: {
 
                },
                loading: false,
                error: {
                    message: '',
                    code: ''
                }
            
            }
        )
    })
    
    it('Should handle the start',()=>{
        expect(reducer([],{
            type: LOGOUT.start
        })).toEqual( {"loading": true})
    })

    it('Should handle the end',()=>{
        expect(reducer([],{
            type: LOGOUT.end
        })).toEqual( {"loading": false})
    })

    it('Should handle the success',()=>{
        expect(reducer([],{
            type: LOGOUT.success
        })).toEqual({"userData": null})
    })

    it('Should handle the failed',()=>{
        expect(reducer([],{
            type: LOGOUT.failed
        })).toEqual( {"error": {"code": "", "message": ""}})
    })

});