import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

 import { VisitFilter } from './index.js';

 Enzyme.configure({ adapter: new Adapter() })

 let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    serviceCategory: [{serviceCategoryId: 1, serviceCategoryDescription: 'TEST'}],
    AllPatientForserviceProviders:  [{ patientId: '1', isChecked: false, imageString: '', firstName: 'TEST', lastName: 'TEST' }],
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    }
}

 store = mockStore(defaultState);

 const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <VisitFilter dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

 describe("VisitFilter", function () {
    let wrapper, shallowWrapper;

     beforeEach(() => {
        const props = defaultState;
        wrapper = setUp(props);
        shallowWrapper = shallow(
            <VisitFilter dispatch={dispatch} store={store} {...defaultState} />
        )
    });

     it('Check the VisitFilter form body', () => {
        expect(wrapper.find('.FilterWidget').length).toEqual(1);
    });

     it('Check the toggle true', () => {
        shallowWrapper.instance().toggle();
    });

     it('Check the toggle false', () => {
        shallowWrapper.instance().toggle(1);
        shallowWrapper.instance().toggle(2);
        shallowWrapper.instance().toggle(3);
    });

     it('Check the dateFromChanged true', () => {
        shallowWrapper.instance().dateFromChanged('04-23-2019');
    });

     it('Check the dateFromChanged false', () => {
        shallowWrapper.instance().dateFromChanged('');
    });

     it('Check the dateToChanged true', () => {
        shallowWrapper.instance().dateToChanged('04-23-2019');
    });

     it('Check the dateToChanged false', () => {
        shallowWrapper.instance().dateToChanged('');
    });

     it('Check the getServiceProvider', () => {
        const data = [{ serviceProviderId: '1', isChecked: false, image: '', firstName: 'TEST', lastName: 'TEST' }]
        shallowWrapper.instance().getServiceProvider(data);
    });

     it('Check the getAllPatientForServiceProvider', () => {
        const data = [{ patientId: '1', isChecked: false, imageString: '', firstName: 'TEST', lastName: 'TEST' }]
        shallowWrapper.instance().getAllPatientForServiceProvider(data);
    });

     it('Check the onCheckServiceProvider', () => {
        const data = [{ serviceProviderId: '1', isChecked: false, image: '', firstName: 'TEST', lastName: 'TEST' }]
        shallowWrapper.instance().onCheckServiceProvider(data, true);
    });

     it('Check the onCheckPatientForServiceProvider', () => {
        const data = [{ serviceProviderId: '1', isChecked: false, image: '', firstName: 'TEST', lastName: 'TEST' }]
        shallowWrapper.instance().onCheckPatientForServiceProvider(data, true);
    });

     it('Check the dateChangedRaw', () => {
        shallowWrapper.instance().dateChangedRaw({ target: { value: 1 } });
    });

     it('Check the dateChangedRawEndDate', () => {
        shallowWrapper.instance().dateChangedRawEndDate({ target: { value: 1 } });
    });

     // it('Check the reset', () => {
    //     shallowWrapper.instance().reset();
    // });

     // it('Check the toggleCertification', () => {
    //     shallowWrapper.instance().toggleCertification();
    // });

     // it('Check the checkValidation true', () => {
    //     shallowWrapper.instance().checkValidation(true, 'VTU', 'BE', '123');
    // });

     // it('Check the checkValidation false', () => {
    //     shallowWrapper.instance().checkValidation(true, '', '', '');
    // });

     // it('Check the addCertification', () => {
    //     shallowWrapper.instance().addCertification();
    // });

     // it('Check the showModalOnDelete', () => {
    //     shallowWrapper.instance().showModalOnDelete({ target: { id: 1 } });
    // });

     // it('Check the editCertification', () => {
    //     shallowWrapper.instance().editCertification({ target: { id: 1 } });
    // });

     // it('Check the updateCertification', () => {
    //     shallowWrapper.instance().updateCertification();
    // });

     // it('Check the deleteCertification', () => {
    //     shallowWrapper.instance().deleteCertification();
    // });

     // it('Check the CertificationModal form body', () => {
    //     expect(wrapper.find('.CertificationModal').length).toEqual(1);
    // });

 }); 