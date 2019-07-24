import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

import { Certification, mapDispatchToProps, mapStateToProps } from './index.js';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    certificationList: [],
    certificationFieldDetails: {
        authority: '',
        certificationName: '',
        licenceNumber: ''
    },
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    getCertification: jest.fn(),
    addCertification: jest.fn(),
    editCertification: jest.fn(),
    updateCertification: jest.fn(),
    deleteCertification: jest.fn()
}

store = mockStore(defaultState);

const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <Certification dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

describe("Certification", function () {
    let wrapper, shallowWrapper;

    beforeEach(() => {
        const props = defaultState;
        wrapper = setUp(props);
        shallowWrapper = shallow(
            <Certification dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the Certification form body', () => {
        expect(wrapper.find('.SPCardTitle').length).toEqual(1);
    });

    it('should test mapStateToProps state', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
     });
  
    it('Check the mapDispatchToProps fn()', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getCertification();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).addCertification();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).editCertification();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).updateCertification();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).deleteCertification();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    it('Check the componentWillReceiveProps function', () => {
        wrapper.isImageSave = false
        const nextProps = {
            certificationFieldDetails:{ 
                certificationName :'',
                authority:'',
                licenceNumber:'',
                certificationId:''
            }
        }
        wrapper.instance().componentWillReceiveProps(nextProps)
   });

    it('Check the componentDidMount', () => {
        shallowWrapper.instance().componentDidMount();
    });

    it('Check the reset', () => {
        shallowWrapper.instance().reset();
    });

    it('Check the toggleCertification', () => {
        shallowWrapper.instance().toggleCertification();
    });

    it('Check the checkValidation true', () => {
        shallowWrapper.instance().checkValidation(true, 'VTU', 'BE', '123');
    });

    it('Check the checkValidation false', () => {
        shallowWrapper.instance().checkValidation(true, '', '', '');
    });

    it('Check the addCertification', () => {
        shallowWrapper.instance().addCertification();
    });

    it('Check the showModalOnDelete', () => {
        shallowWrapper.instance().showModalOnDelete({ target: { id: 1 } });
    });

    it('Check the editCertification', () => {
        shallowWrapper.instance().editCertification({ target: { id: 1 } });
    });

    it('Check the updateCertification', () => {
        shallowWrapper.instance().updateCertification();
    });

    it('Check the deleteCertification', () => {
        shallowWrapper.instance().deleteCertification();
    });

    it('Check the CertificationModal form body', () => {
        expect(wrapper.find('.CertificationModal').length).toEqual(1);
    });

}); 