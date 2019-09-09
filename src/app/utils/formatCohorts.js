export const formatCohorts = (individualList) => {
    return individualList.map(individual =>{
        let cohortList = "";
        if(individual.cohorts){
            individual.cohorts.map(cohort =>{
                return cohortList = cohortList + cohort.cohortName + ', ';
            });
            cohortList = cohortList.slice(0, -2);
            individual.cohorts = cohortList;
        }
        return individual;
    })
};