import reducer from './reducer'
describe('ap reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                appStatus: false,
                loading: true
            }
        )
    })

    it('should handle APP_INIT/app with data', () => {
        expect(
            reducer( [{type: 'APP_INIT',aboutUsContent: 'Run the tests'}],
                    {type: 'APP_INIT',data: 'Run the tests'}
                   )
          ).toBeDefined()
    })

    it('should handle APP_READY/app with data', () => {
        expect(
            reducer( [  {type: 'APP_READY',aboutUsContent: 'Run the tests'}],
                        {type: 'APP_READY',data: 'Run the tests'}
                   )
          ).toBeDefined()
    })
});