export const validate = {
    oneTime:
        [
            { key: 'startDate', validation: 'required', isState: true },
            { key: 'startTime', validation: 'required', isState: true },
            { key: 'endTime', validation: 'required', isState: true },
            { key: 'serviceTypes', validation: 'checkLength', isState: false },
            { key: 'street', validation: 'required', isState: true },
            { key: 'city', validation: 'required', isState: true },
            { key: 'state', validation: 'required', isState: true },
            { key: 'zip', validation: 'checkLengthOfZip', isState: true }
        ],
    recurring:
    {
        daily:
            [
                { key: 'startDate', validation: 'required', isState: true },
                { key: 'endDate', validation: 'required', isState: true },
                { key: 'startTime', validation: 'required', isState: true },
                { key: 'endTime', validation: 'required', isState: true },
                { key: 'dailyDayOccurence', validation: 'required', isState: true },
                { key: 'serviceTypes', validation: 'checkLength', isState: false },
                { key: 'street', validation: 'required', isState: true },
                { key: 'city', validation: 'required', isState: true },
                { key: 'zip', validation: 'checkLengthOfZip', isState: true },
                { key: 'state', validation: 'required', isState: true }
            ],

        weekly:
            [
                { key: 'startDate', validation: 'required', isState: true },
                { key: 'endDate', validation: 'required', isState: true },
                { key: 'startTime', validation: 'required', isState: true },
                { key: 'endTime', validation: 'required', isState: true },
                { key: 'weeklyDayOccurence', validation: 'required', isState: true },
                { key: 'weeklySelectedDays', validation: 'checkLength', isState: false },
                { key: 'serviceTypes', validation: 'checkLength', isState: false },
                { key: 'street', validation: 'required', isState: true },
                { key: 'city', validation: 'required', isState: true },
                { key: 'zip', validation: 'checkLengthOfZip', isState: true },
                { key: 'state', validation: 'required', isState: true }
            ],

        monthly:
        {
            first: [
                { key: 'startDate', validation: 'required', isState: true },
                { key: 'endDate', validation: 'required', isState: true },
                { key: 'startTime', validation: 'required', isState: true },
                { key: 'endTime', validation: 'required', isState: true },
                { key: 'monthlyDay', validation: 'required', isState: true },
                { key: 'monthlyMonths', validation: 'required', isState: true },
                { key: 'serviceTypes', validation: 'checkLength', isState: false },
                { key: 'street', validation: 'required', isState: true },
                { key: 'city', validation: 'required', isState: true },
                { key: 'zip', validation: 'checkLengthOfZip', isState: true },
                { key: 'state', validation: 'required', isState: true }
            ],
            second: [
                { key: 'startDate', validation: 'required', isState: true },
                { key: 'endDate', validation: 'required', isState: true },
                { key: 'startTime', validation: 'required', isState: true },
                { key: 'endTime', validation: 'required', isState: true },
                { key: 'selectedDaysId', validation: 'required', isState: true },
                { key: 'selectedWeeksId', validation: 'required', isState: true },
                { key: 'monthlyMonthsSecond', validation: 'required', isState: true },
                { key: 'serviceTypes', validation: 'checkLength', isState: false },
                { key: 'street', validation: 'required', isState: true },
                { key: 'city', validation: 'required', isState: true },
                { key: 'zip', validation: 'checkLengthOfZip', isState: true },
                { key: 'state', validation: 'required', isState: true }
            ]
        }
    },
    assessment: [
        { key: 'startDate', validation: 'required', isState: true },
        { key: 'startTime', validation: 'required', isState: true },
        { key: 'endTime', validation: 'required', isState: true },
        { key: 'street', validation: 'required', isState: true },
        { key: 'city', validation: 'required', isState: true },
        { key: 'state', validation: 'required', isState: true },
        { key: 'zip', validation: 'checkLengthOfZip', isState: true }
    ],
    assessment_edit: [
        { key: 'startDate', validation: 'required', isState: true },
        { key: 'startTime', validation: 'required', isState: true },
        { key: 'endTime', validation: 'required', isState: true },
        { key: 'street', validation: 'required', isState: true },
        { key: 'city', validation: 'required', isState: true },
        { key: 'state', validation: 'required', isState: true },
        { key: 'zip', validation: 'checkLengthOfZip', isState: true }
    ]
}

export const recurringPatternValidate = {
    recurring:
    {
        daily:
            [
                { key: 'dailyDayOccurence', validation: 'required', isState: true },
            ],

        weekly:
            [
                { key: 'weeklyDayOccurence', validation: 'required', isState: true },
                { key: 'weeklySelectedDays', validation: 'checkLength', isState: false },
            ],

        monthly:
        {
            first: [
                { key: 'monthlyDay', validation: 'required', isState: true },
                { key: 'monthlyMonths', validation: 'required', isState: true },
                { key: 'monthlyOptions', validation: 'required', isState: true }
            ],
            second: [
                { key: 'selectedDaysId', validation: 'required', isState: true },
                { key: 'selectedWeeksId', validation: 'required', isState: true },
                { key: 'monthlyMonthsSecond', validation: 'required', isState: true },
                { key: 'monthlyOptions', validation: 'required', isState: true }
            ]
        }
    },
}

