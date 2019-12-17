import reducer from './reducer'
import { VisitNotification
} from './bridge'


describe('ServiceOffered - languages reducer test case', () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(
            {
                VisitNotification: [],
                dataCount: 0
            }
        );
    });

    it("should return the getVisitNotificationSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitNotification.getVisitNotificationSuccess,
            data: data
        })).toEqual(
            {
                VisitNotification: data
            }
        )
    });

    it("should return the getVisitNotificationCountSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitNotification.getVisitNotificationCountSuccess,
            data: data
        })).toEqual(
            {
                dataCount: data
            }
        )
    });
});