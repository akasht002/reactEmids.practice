import reducer from './reducer';
import ServiceAreaState from './reducer'
import { ServiceArea } from './bridge'

describe('Individuals reducer', () => {

    it('should return the initial state', () => {
        expect(ServiceAreaState(undefined, {})).toEqual(
            {
                ServiceAreaList: [],
                ServiceAreaFieldDetails:{},
                addServiceAreaSuccess:false,
                posInvalidAddressErrorMessage: '',
                showModalOnPOS: false
            }
        )
    })

    it('should handle getServiceAreaSuccess', () => {
        expect(
            reducer([], {
                type: ServiceArea.getServiceAreaSuccess,
                data: []
            })
        ).toEqual(
            {
                ServiceAreaList: []
            }
        )
    })

    it('should handle getServiceAreaFieldDetails', () => {
        expect(
            reducer([], {
                type: ServiceArea.getServiceAreaFieldDetails,
                data: []
            })
        ).toEqual(
            {
                "ServiceAreaFieldDetails": []
            }
        )
    })

    it('should handle addServiceAreaSuccess', () => {
        expect(
            reducer([], {
                type: ServiceArea.addServiceAreaSuccess,
                isSuccess: false
            })
        ).toEqual(
            {
                addServiceAreaSuccess: false,
                ServiceAreaFieldDetails: {
                    street: '',
                    state_id: '',
                    city: '',
                    zip: ''
                  }
            }
        )
    })

    it('should handle setPointOfServiceErrorMessage', () => {
        expect(
            reducer([], {
                type: ServiceArea.setPointOfServiceErrorMessage,
                data: "dsfs"
            })
        ).toEqual(
            {
                posInvalidAddressErrorMessage: "dsfs",
                showModalOnPOS: true
            }
        )
    })

   it('should handle clearPOSErrorMessage', () => {
        expect(
            reducer([], {
                type: ServiceArea.clearPOSErrorMessage,
                data: ""
            })
        ).toEqual(
            {
                posInvalidAddressErrorMessage: "",
                showModalOnPOS: false
            }
        )
    })
})