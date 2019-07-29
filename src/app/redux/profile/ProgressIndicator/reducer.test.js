import reducer from './reducer'
import { ProgressIndicator } from './actions'


describe('ProgressIndicator - languages reducer test case', () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(
            {
                profilePercentage: ''
            }
        );
    });

    it("should return the getProfilePercentageSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: ProgressIndicator.getProfilePercentageSuccess,
            data: data
        })).toBeDefined();
    });
});