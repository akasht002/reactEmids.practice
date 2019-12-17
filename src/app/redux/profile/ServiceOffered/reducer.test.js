import reducer from './reducer'
import { ServiceOffered } from './bridge'


describe('ServiceOffered - languages reducer test case', () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(
            {
                serviceOfferedList: [],
                serviceOfferedDetails: ''
            }
        );
    });

    it("should return the getServicesOfferedSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: ServiceOffered.getServicesOfferedSuccess,
            data: data
        })).toEqual(
            {
                serviceOfferedList: data
            }
        )
    });

    it("should return the getServiceOfferedDetails state", () => {
        let data = {}
        expect(reducer(data, {
            type: ServiceOffered.getServiceOfferedDetails,
            data: data
        })).toEqual(
            {
                serviceOfferedDetails: data
            }
        )
    });
});