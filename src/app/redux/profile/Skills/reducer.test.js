import reducer from './reducer'
import { Skills } from './bridge'


describe('Skills - languages reducer test case', () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(
            {
                SkillsList: [],
                selectedSkillsList:[]
            }
        );
    });

    it("should return the getSkillsSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: Skills.getSkillsSuccess,
            data: data
        })).toEqual(
            {
                SkillsList: data
            }
        )
    });

    it("should return the getSelectedSkillsDetails state", () => {
        let data = {}
        expect(reducer(data, {
            type: Skills.getSelectedSkillsDetails,
            data: data
        })).toEqual(
            {
                selectedSkillsList: data
            }
        )
    });
});