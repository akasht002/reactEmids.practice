import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { Education, mapDispatchToProps, mapStateToProps } from './index.js';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    educationList: [],
    educationalDetails: {
        school: '',
        degree: '',
        fieldOfStudy: '',
        startYear: '',
        endYear: ''
    },
    profileState: {
        EducationState: {
            educationList: [],
            addeducationSuccess: true,
            educationalDetails: {}
        },
        PersonalDetailState: {
            isUser: true
        }
    },
    onboardingState: {
        setPasswordState: {
            serviceProviderDetails: {
                serviceProviderId: 1
            }
        }
    },
    getEducation: jest.fn(),
    addEducation: jest.fn(),
    editEducation: jest.fn(),
    updateEducation: jest.fn(),
    deleteEducation: jest.fn()
}

store = mockStore(defaultState);

describe("Education", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <Education dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the Education form body', () => {
        expect(shallowWrapper.find('.SPCardTitle').length).toEqual(1);
    });

    it('Check the componentDidMount', () => {
        shallowWrapper.instance().componentDidMount();
    });

    it('Check the componentWillReceiveProps', () => {
        let nextProps = {
            educationalDetails: {
                school: '',
                degree: '',
                fieldOfStudy: '',
                startYear: '',
                endYear: ''
            }
        }
        shallowWrapper.instance().componentWillReceiveProps(nextProps);
    });

    it('Check the reset', () => {
        shallowWrapper.instance().reset();
    });

    it('Check the toggleEducation', () => {
        shallowWrapper.instance().toggleEducation();
    });

    it('Check the checkValidation true', () => {
        shallowWrapper.instance().checkValidation(true, 'SAIT', 'BE', 'CSE', '04-22-2019', '04-23-2019');
    });

    it('Check the checkValidation false', () => {
        shallowWrapper.instance().checkValidation(true, '', '', '', '', '');
    });

    it('Check the addEducation', () => {
        shallowWrapper.instance().addEducation();
        shallowWrapper.setState({
            school: 'asad',
            degree: 'sada',
            fieldOfStudy: 'sadas',
            startYear: 'dsd',
            endYear: 'asda'
        })
        shallowWrapper.instance().addEducation();
    });

    it('Check the showModalOnDelete', () => {
        shallowWrapper.instance().showModalOnDelete({ target: { id: 1 } });
    });

    it('Check the editEducation', () => {
        shallowWrapper.instance().editEducation({ target: { id: 1 } });
    });

    it('Check the updateEducation', () => {
        shallowWrapper.instance().updateEducation();
        shallowWrapper.setState({
            school: 'asad',
            degree: 'sada'
        })
        shallowWrapper.instance().updateEducation();
    });

    it('Check the deleteEducation', () => {
        shallowWrapper.instance().deleteEducation();
    });

    it('Check the YearList', () => {
        shallowWrapper.instance().YearList();
    });

    it('Check the YearListCal', () => {
        shallowWrapper.instance().YearListCal();
    });

    it('Check the selectChange', () => {
        shallowWrapper.instance().selectChange({ target: { id: 1, value: 1 } });
    });

    it('Check the selectToYearChange', () => {
        shallowWrapper.instance().selectToYearChange({ target: { id: 1, value: 1 } });
    });

    it('should test mapStateToProps state', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });

    it('Check the mapDispatchToProps fn()', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getEducation();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).addEducation({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).editEducation({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).updateEducation({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).deleteEducation({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    it('check the events', () => {
        shallowWrapper.setProps({
            isUser: true,
            educationList: [{
                educationId: 1,
                fieldOfStudy: 'asd ada',
                school: 'ada ad',
                startYear: '11/12/2019',
                endYear: '11/12/2019'
            }]
        })
        let e = {
            target: {
                value: 'cxzx'
            }
        }
        expect(shallowWrapper.find('[test-discard="test-discard"]').props().onConfirm());
        expect(shallowWrapper.find('[test-discard="test-discard"]').props().onCancel());
        expect(shallowWrapper.find('[test-remove="test-remove"]').props().onConfirm());
        expect(shallowWrapper.find('[test-remove="test-remove"]').props().onCancel());
        expect(shallowWrapper.find('[test-addIcon="test-addIcon"]').props().onClick());
        expect(shallowWrapper.find('[test-showModalOnDelete="test-showModalOnDelete"]').props().onClick(e));
        expect(shallowWrapper.find('[test-editEducation="test-editEducation"]').props().onClick(e));
        expect(shallowWrapper.find('[test-educationModalOpen="test-educationModalOpen"]').props().onClick());
    });
}); 