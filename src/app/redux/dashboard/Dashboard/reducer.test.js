import DashboardState from './reducer'
import { DashboardDetail  } from './bridge'


describe('aboutUs reducer', () => {
    it('should return the initial state', () => {
        expect(DashboardState(undefined, {})).toBeDefined()
    })

    it('should handle DashboardDetail get_conversation_detail_success', () => {
        let data = {}
        expect(
            DashboardState([], {
                type: DashboardDetail.get_conversation_detail_success,
                data:data
            })
        ).toEqual({ conversationDetail: data }) 

    })

    it('should handle DashboardDetail set_unread_conversation_count_detail', () => {
        let data = {}
        expect(
            DashboardState([], {
                type: DashboardDetail.set_unread_conversation_count_detail,
                data:data
            })
        ).toEqual({ unreadCounts: data }) 

    })

    it('should handle DashboardDetail get_service_provider_detail_success', () => {
        let data = {}
        expect(
            DashboardState([], {
                type: DashboardDetail.get_service_provider_detail_success,
                data:data
            })
        ).toEqual({ serviceProvider: data }) 

    })

    it('should handle DashboardDetail get_patient_service_request_detail_success', () => {
        let data = {}
        expect(
            DashboardState([], {
                type: DashboardDetail.get_patient_service_request_detail_success,
                data:data
            })
        ).toEqual({ patientServiceRequest: data }) 

    })

    it('should handle DashboardDetail get_patient_visit_detail_success', () => {
        let data = {}
        expect(
            DashboardState([], {
                type: DashboardDetail.get_patient_visit_detail_success,
                data:data
            })
        ).toEqual({ serviceVist: data }) 

    })

    it('should handle DashboardDetail get_service_visit_count', () => {
        let data = {}
        expect(
            DashboardState([], {
                type: DashboardDetail.get_service_visit_count,
                data:data
            })
        ).toEqual({ serviceVistCount: data }) 

    })

    it('should handle DashboardDetail get_entity_service_provider_list', () => {
        let data = {}
        expect(
            DashboardState([], {
                type: DashboardDetail.get_entity_service_provider_list,
                data:data
            })
        ).toEqual({ serviceProviderList: data }) 

    })

    it('should handle DashboardDetail setServiceVisitDate', () => {
        let data = {}
        expect(
            DashboardState([], {
                type: DashboardDetail.setServiceVisitDate,
                data:data
            })
        ).toEqual({ serviceVisitDate: data }) 

    })

    it('should handle DashboardDetail setConversationLoader', () => {
        let data = {}
        expect(
            DashboardState([], {
                type: DashboardDetail.setConversationLoader,
                data:data
            })
        ).toEqual({ isConversationLoading: data }) 

    })

    it('should handle DashboardDetail setServiceRequestLoader', () => {
        let data = {}
        expect(
            DashboardState([], {
                type: DashboardDetail.setServiceRequestLoader,
                data:data
            })
        ).toEqual({ isServiceRequestLoading: data }) 

    })

    it('should handle DashboardDetail setServiceVisitLoader', () => {
        let data = {}
        expect(
            DashboardState([], {
                type: DashboardDetail.setServiceVisitLoader,
                data:data
            })
        ).toEqual({ isServiceVisitLoading: data }) 

    })

    it('should handle DashboardDetail get_service_request_success', () => {
        let data = {}
        expect(
            DashboardState([], {
                type: DashboardDetail.get_service_request_success,
                data:data
            })
        ).toEqual({ serviceStatusLookUp: data }) 

    })
});