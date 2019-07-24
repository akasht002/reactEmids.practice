import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

import { Education, mapDispatchToProps, mapStateToProps } from './index.js';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    educationList: [{ "educationId": 163, "serviceProviderId": 14, "school": "Nurse", "degree": "MS", "fieldOfStudy": "Pathology", "startYear": "1901", "endYear": "1901", "isActive": true, "rowversionId": "AAAAAABQyJE=", "educationExternalId": 0 }],
    getEducation: jest.fn()
}

store = mockStore(defaultState);

const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <Education dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

describe("Education", function () {
    let wrapper, shallowWrapper;

    beforeEach(() => {
        const props = defaultState;
        wrapper = setUp(props);
        shallowWrapper = shallow(
            <Education dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the Education form body', () => {
        expect(wrapper.find('.SPEducationItems').length).toEqual(1);
    });

    it('Check the componentDidMount', () => {
        shallowWrapper.instance().componentDidMount();
    });

    it('Check the Empty Education List', () => {
        shallowWrapper.setProps({ educationList: [] })
        shallowWrapper.instance().componentDidMount();
    });

    it('Check mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getEducation();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    it('Check mapStateToProps', () => {
        const initialState = {
            patientProfileState: {
                espEducation: []
            }
        }
        expect(mapStateToProps(initialState)).toBeDefined();
    });
}); 