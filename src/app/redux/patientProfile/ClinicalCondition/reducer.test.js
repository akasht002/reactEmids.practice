import reducer from './reducer'
import { ClinicalCondition } from './actions'



describe('Profile - Clinical Condition reducer test case',()=>{
    it("should return the initial state",()=>{
        expect(reducer(undefined, {})).toEqual(
            {
                ClinicalConditionList: [],
                selectedClinicalConditionList:[],
                selectedClinicalConditionsList:[]

            }
        );
    });

    it("should return the getClinicalConditionSuccess state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: ClinicalCondition.getClinicalConditionSuccess,
            data: data
        })).toEqual(
            { ClinicalConditionList :data}
        )
    });

    it("should return the getSelectedClinicalConditionDetails state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: ClinicalCondition.getSelectedClinicalConditionDetails,
            data: data
        })).toEqual(
            { selectedClinicalConditionsList :data}
        )
    });

    it("should return the GET_SELECTED_CLINICAL_CONDITION_SUCCESS state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: ClinicalCondition.GET_SELECTED_CLINICAL_CONDITION_SUCCESS,
            data: data
        })).toEqual(
            { selectedClinicalConditionsList :data}
        )
    });


    it("should return the clearState state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: ClinicalCondition.clearState,
            data: data
        })).toEqual(
            {   ClinicalConditionList: [],
                selectedClinicalConditionList:[],
                selectedClinicalConditionsList:[]
            }
        )
    });

});