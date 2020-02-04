const commonFieldName = {
    servicePlanVisitNumber: 'SV ID',
    serviceCategory: 'Service Category',
    patientFullName: 'Individuals',
    visitStatus: 'Status',
    schedule: 'Schedule',
}

export let allServiceVisits = {
    ...commonFieldName,
    task: 'Task',
    providerFullName: 'Entity Provider',
    icon: 'Actions',
    className: 'all-serviceVisits-tableblock'
}

export let cancelledServiceVisits = {
    ...commonFieldName,
    providerFullName: 'Entity Provider',
    icon: 'Actions',
    className: 'cancelled-serviceVisits-tableblock'
}

export let lowTaskServiceVisits = {
    ...commonFieldName,
    task: 'Task',
    providerFullName: 'Entity Provider',
    icon: 'Actions',
    className: 'lowtask-serviceVisits-tableblock'
}

export let overDueServiceVisits = {
    ...commonFieldName,
    providerFullName: 'Entity Provider',
    icon: 'Actions',
    className: 'overdue-serviceVisits-tableblock'
}