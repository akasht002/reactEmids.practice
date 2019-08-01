import reducer from './reducer'
import { VisitNotificationSettings } from './bridge'


describe('VisitNotificationSettings - languages reducer test case', () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(
            {
                pushNotification: [],
                emailNotification: [],
                isLoading : false

            }
        );
    });

    it("should return the getVisitNotificationSettingsSuccess state", () => {
        let data = {pushNotification:'',emailNotification:''    }
        expect(reducer(data, {
            type: VisitNotificationSettings.getVisitNotificationSettingsSuccess,
            data: data
        })).toEqual(
            {
                pushNotification: data.pushNotification,
                emailNotification: data.emailNotification

            }
        )
    });

    it("should return the updateVisitNotificationSettingsSuccess state", () => {
        let data = {pushNotification:'',emailNotification:''    }
        expect(reducer(data, {
            type: VisitNotificationSettings.updateVisitNotificationSettingsSuccess,
            data: data
        })).toBeDefined();
    });

    it("should return the handlePushChangeSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitNotificationSettings.handlePushChangeSuccess,
            data: data
        })).toEqual(
            {
                pushNotification: data

            }
        )
    });

    it("should return the handleEmailChangeSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitNotificationSettings.handleEmailChangeSuccess,
            data: data
        })).toEqual(
            {
                emailNotification: data
            }
        )
    });

    it("should return the startLoadingNotification state", () => {
        let data = true
        expect(reducer(data, {
            type: VisitNotificationSettings.startLoadingNotification,
            data
        })).toEqual(
            {
                isLoading: true
            }
        )
    });

    it("should return the endLoadingNotification state", () => {
        let data = false
        expect(reducer(data, {
            type: VisitNotificationSettings.endLoadingNotification,
            data: data
        })).toEqual(
            {
                isLoading: false
            }
        )
    });
});