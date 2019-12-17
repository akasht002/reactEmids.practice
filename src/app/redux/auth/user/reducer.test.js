import reducer from './reducer';
import { USER } from './bridge';

describe('Auth - ResetPassword reducer test case', () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(
            {
                "error":
                    { "code": "", "message": "" },
                "isFormDirty": false,
                "loading": false,
                "menuClicked": null,
                "roles": {},
                "userData": {}
            }
        )
    })

    it('Should handle the fetch_success/user', () => {
        let data = {}
        expect(reducer([], {
            type: USER.setUser,
            data
        })).toEqual({ "userData": undefined })
    })

    it('Should handle the delete_user/user', () => {
        let data = null
        expect(reducer([], {
            type: USER.deleteUser,
            data
        })).toEqual({"userData": null})
    })

    it('Should handle the clear_data/user', () => {
        expect(reducer([], {
            type: USER.clearData
        })).toEqual({"error": {"code": "", "message": ""}, "isFormDirty": false, "loading": false, "menuClicked": null, "roles": {}, "userData": {}})
    })

    it('Should handle the set_isFormDirty/user', () => {
        let data = {}
        expect(reducer([], {
            type: USER.setIsFormDirty,
            data
        })).toEqual({ "isFormDirty": {} })
    })

    it('Should handle the menuClicked/user', () => {
        let data = {}
        expect(reducer([], {
            type: USER.menuClicked,
            data
        })).toEqual({ "menuClicked": {} })
    })
});