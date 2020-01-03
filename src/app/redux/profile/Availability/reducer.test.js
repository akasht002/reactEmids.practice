import reducer from './reducer'
import { AvailabilityActions } from './bridge'


describe('Availability reducer test case', () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(
            {
                availableDays: {},
                blackoutDays: [],
                allAvailableSlots: []
            }
        );
    });

    it("should return the setAvailabilityDays state", () => {
        let data = {}
        expect(reducer(data, {
            type: AvailabilityActions.setAvailabilityDays,
            data: data
        })).toEqual(
            {
                availableDays: data
            }
        )
    });

    it("should return the setBlackoutDays state", () => {
        let data = {}
        expect(reducer(data, {
            type: AvailabilityActions.setBlackoutDays,
            data: data
        })).toEqual(
            {
                blackoutDays: data
            }
        )
    });

    it("should return the setAllAvailabilitySlots state", () => {
        let data = {}
        expect(reducer(data, {
            type: AvailabilityActions.setAllAvailabilitySlots,
            data: data
        })).toEqual(
            {
                allAvailableSlots: data
            }
        )
    });
});