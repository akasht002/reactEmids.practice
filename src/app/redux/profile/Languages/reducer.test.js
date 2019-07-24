import reducer from './reducer'
import { Languages } from './bridge'


describe('Education reducer test case', () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(
            {
                LanguagesList: [],
                selectedLanguagesList: []
            }
        );
    });

    it("should return the getLanguagesSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: Languages.getLanguagesSuccess,
            data: data
        })).toEqual(
            {
                LanguagesList: data
            }
        )
    });

    it("should return the getSelectedLanguageDetails state", () => {
        let data = {}
        expect(reducer(data, {
            type: Languages.getSelectedLanguageDetails,
            data: data
        })).toEqual(
            {
                selectedLanguagesList: data
            }
        )
    });
});