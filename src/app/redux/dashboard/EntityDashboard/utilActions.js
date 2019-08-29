import _ from 'lodash';

export const updateCountList = (countList, resp) => {
    let index = _.findIndex(countList, { statusName: resp.data[0].statusName });
     countList.splice(index, 1, {
        label: resp.data[0].label,
        statusName: resp.data[0].statusName,
        subtext: resp.data[0].subtext,
        totalCount: resp.data[0].totalCount
    })
    return countList;
}

export const checkDataCount = resp => {
    return (resp.data && resp.data[0].totalCount > 0) ? resp.data[0].totalCount : 0
}