import reducer from './reducer'
import { Education } from './bridge'


describe('Education reducer test case', () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(
            {
                educationList: [],
                educationalDetails: '',
                addeducationSuccess: false
            }
        );
    });

    it("should return the getEducationSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: Education.getEducationSuccess,
            data: data
        })).toEqual(
            {
                educationList: data
            }
        )
    });

    it("should return the getEducationFieldDetails state", () => {
        let data = {}
        expect(reducer(data, {
            type: Education.getEducationFieldDetails,
            data: data
        })).toEqual(
            {
                educationalDetails: data
            }
        )
    });

    it("should return the addEducationSuccess state", () => {
        let data = {}
        let isSuccess = true
        let educationalDetails = {
            school: '',
            degree: '',
            fieldOfStudy: '',
            startYear: '',
            endYear: ''
        }
        expect(reducer(data, {
            type: Education.addEducationSuccess,
            data: data,
            isSuccess: isSuccess,
            educationalDetails: educationalDetails
        })).toEqual(
            {
                addEducationSuccess: isSuccess,
                educationalDetails: {
                    school: '',
                    degree: '',
                    fieldOfStudy: '',
                    startYear: '',
                    endYear: ''
                }
            }
        )
    });
});