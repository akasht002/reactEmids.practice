import { formatAssessmentData } from './assessment'


describe('Test',()=>{
    it('Data',()=>{
        expect(formatAssessmentData({
            data:{
                serviceProviderId:34,
                address:{
                    patientAddressId:23,
                    streetAddress :343,
                    city:'',
                    stateName:'',
                    stateId:23,
                    zip:45454
                },
                latitude:{
                    LATITUDE:34,

                },
                longitude:{
                    LONGITUDE:345 
                }
            }
        })).toBeDefined();
    })
})