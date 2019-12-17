import reducer from './reducer'
import { Certification } from './bridge'


describe('Certification reducer test case', () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(
            {
                certificationList: [],
                certificationFieldDetails: '',
                addCertificationSuccess: false
            }
        );
    });

    it("should return the getCertificationSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: Certification.getCertificationSuccess,
            data: data
        })).toEqual(
            {
                certificationList: data
            }
        )
    });

    it("should return the getCertificationFieldDetails state", () => {
        let data = {}
        expect(reducer(data, {
            type: Certification.getCertificationFieldDetails,
            data: data
        })).toEqual(
            {
                certificationFieldDetails: data
            }
        )
    });

    it("should return the addCertificationSuccess state", () => {
        let data = {}
        let isSuccess = true
        let certificationFieldDetails = {
            certificationName: '',
            authority: '',
            licenceNumber: ''
        }
        expect(reducer(data, {
            type: Certification.addCertificationSuccess,
            data: data,
            isSuccess: isSuccess,
            certificationFieldDetails: certificationFieldDetails
        })).toEqual(
            {
                addCertificationSuccess: isSuccess,
                certificationFieldDetails: {
                    certificationName: '',
                    authority: '',
                    licenceNumber: ''
                }
            }
        )
    });
});