const commonFieldName = {
    serviceRequestId: 'SR ID',
    serviceCategory: 'Service Category',
    serviceType: 'Service Type',
    patientFullName: 'Individuals',
    status: 'Status',
    icon: 'Actions'
}
export let allServiceRequests = {
    ...commonFieldName,
    className: 'all-serviceRequests-tableblock'
}

export let cancelledServiceRequests = {
    ...commonFieldName,
    className: 'cancelled-serviceRequests-tableblock'
}

export let openServiceRequests = {
    ...commonFieldName,
    className: 'open-serviceRequests-tableblock'
}