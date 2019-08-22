import moment from 'moment'
import { getUserInfo } from '../../../../utils/userUtility'
import { DATE_FORMAT } from '../../../../constants/constants'

export const getInitializeFilterData = (data) => {
    return {
        memberContractId:  0,
        cohorts:  [],
        attributeProviders:  [],
        clinicalConditions:  [],
        contracts: [],
        minimumAge:  0,
        maximumAge:  0,
        gender:  0,
        rating: 0,
        fromDate: moment(data.fromDate).format(DATE_FORMAT),
        toDate: moment(data.toDate).format(DATE_FORMAT),
        careTeamId: getUserInfo().careTeamId,
        statusName: data.status,
        pageNumber:  1,
        pageSize: 10,
        sortName: data.sortName,
        sortOrder: data.sortOrder,
        streetAddress:  '',
        city: '',
        stateName:  '',
        zip: 0,
        range: 0,
        lat: 0,
        lon: 0,
        searchText: ''
      }
}