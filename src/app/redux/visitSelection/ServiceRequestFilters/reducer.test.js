import ServiceRequestFilterState from './reducer'
import {
    ServiceRequestFiltersList
} from './actions'


describe('ServiceRequestFilterState reducer', () => {
    it('should return the initial state', () => {
        expect(ServiceRequestFilterState(undefined, {})).toBeDefined()
    })

    it('should handle ServiceRequestFilterState getServiceCategoryListSuccess', () => {
        let data = {}
        expect(
            ServiceRequestFilterState([], {
                type: ServiceRequestFiltersList.getServiceCategoryListSuccess,
                data:data
            })
        ).toEqual({ ServiceCategory: data }) 

    })

    it('should handle ServiceRequestFilterState formDirty', () => {
        let data = {}
        expect(
            ServiceRequestFilterState([], {
                type: ServiceRequestFiltersList.formDirty,
                data:data
            })
        ).toEqual({ FilterDataCount: '' }) 
    })

    it('should handle ServiceRequestFilterState getFilterDataCountSuccess', () => {
        let data = {}
        expect(
            ServiceRequestFilterState([], {
                type: ServiceRequestFiltersList.getFilterDataCountSuccess,
                data:data
            })
        ).toEqual({ FilterDataCount: data }) 
    })

    it('should handle ServiceRequestFilterState getServiceTypeSuccess', () => {
        let data = {}
        expect(
            ServiceRequestFilterState([], {
                type: ServiceRequestFiltersList.getServiceTypeSuccess,
                data:data
            })
        ).toEqual({ ServiceType: data }) 
    })

    it('should handle ServiceRequestFilterState getServiceRequestStatusSuccess', () => {
        let data = {}
        expect(
            ServiceRequestFilterState([], {
                type: ServiceRequestFiltersList.getServiceRequestStatusSuccess,
                data:data
            })
        ).toEqual({ ServiceStatus: data }) 
    })

    it('should handle ServiceRequestFilterState getServiceAreaSuccess', () => {
        let data = {}
        expect(
            ServiceRequestFilterState([], {
                type: ServiceRequestFiltersList.getServiceAreaSuccess,
                data:data
            })
        ).toEqual({ ServiceAreaList: data }) 
    })

    it('should handle ServiceRequestFilterState clearServiceCategory', () => {
        let data = {}
        expect(
            ServiceRequestFilterState([], {
                type: ServiceRequestFiltersList.clearServiceCategory,
                data:data
            })
        ).toEqual({ ServiceType: data }) 
    })

    it('should handle ServiceRequestFilterState clearServiceType', () => {
        let data = {}
        expect(
            ServiceRequestFilterState([], {
                type: ServiceRequestFiltersList.clearServiceType,
                data:data
            })
        ).toEqual({ ServiceType: data }) 
    })

    it('should handle ServiceRequestFilterState clearServiceArea', () => {
        let data = {}
        expect(
            ServiceRequestFilterState([], {
                type: ServiceRequestFiltersList.clearServiceArea,
                data:data
            })
        ).toEqual({ ServiceAreaList: data }) 
    })


    it('should handle ServiceRequestFilterState clearServiceRequestStatus', () => {
        let data = {}
        expect(
            ServiceRequestFilterState([], {
                type: ServiceRequestFiltersList.clearServiceRequestStatus,
                data:data
            })
        ).toEqual({ ServiceStatus: data }) 
    })

    it('should handle ServiceRequestFilterState setDefaultFilteredStatus', () => {
        let data = {}
        expect(
            ServiceRequestFilterState([], {
                type: ServiceRequestFiltersList.setDefaultFilteredStatus,
                data:data
            })
        ).toEqual({ isDashboardFilteredStatus: false }) 
    })

    it('should handle ServiceRequestFilterState getDashboardStatusSuccess', () => {
        let data = {
            data:{
                status:76,
                isDashboardFilteredStatus:true
            }
        }
        expect(
            ServiceRequestFilterState([], {
                type: ServiceRequestFiltersList.getDashboardStatusSuccess,
                data:data
            })
        ).toBeDefined() 
    })
    it('should handle ServiceRequestFilterState getSearchDataCountSuccess', () => {
        let data = {}
        expect(
            ServiceRequestFilterState([], {
                type: ServiceRequestFiltersList.getSearchDataCountSuccess,
                data:data
            })
        ).toEqual({ SearchDataCount: data }) 
    })
});