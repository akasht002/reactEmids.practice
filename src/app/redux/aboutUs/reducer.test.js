import reducer from './reducer'
import * as actions from './actions'

describe('aboutUs reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                aboutUsContent: '',
                buildVersion: ''
            }
        )
    })
    it('should handle getAboutUsContentSuccess/AboutUs', () => {
        expect(
            reducer([], {
                type: 'getAboutUsContentSuccess/AboutUs',
                aboutUsContent: 'Run the tests',
                data:{value:{}},
                value:''
            })
        ).toEqual(
            {
                aboutUsContent: {}
            }
        ) 

    })

    it('should handle getAboutUsContentSuccess/AboutUs with data', () => {
        expect(
            reducer( [{type: 'getAboutUsContentSuccess/AboutUs',aboutUsContent: 'Run the tests'}],
                     { type: 'getAboutUsContentSuccess/AboutUs',aboutUsContent: 'Run the tests',data:{value:{}}}
                   )
          ).toEqual( {"0": {"aboutUsContent": "Run the tests", "type": "getAboutUsContentSuccess/AboutUs"}, "aboutUsContent": {}})
    })

    
    it('should handle getBuildVersionSuccess/AboutUs with data', () => {
      expect(
        reducer( [{type: 'getBuildVersionSuccess/AboutUs',buildVersion: 'Run the tests'}],
                 { type: 'getBuildVersionSuccess/AboutUs',buildVersion: 'Run the tests',data:{value:{}}}
               )
      ).toEqual({"0": {"buildVersion": "Run the tests", "type": "getBuildVersionSuccess/AboutUs"}, "buildVersion": {}})
    })
})