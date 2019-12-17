import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

import { Certification, mapDispatchToProps, mapStateToProps } from './index.js';
import { CSS_PROPS } from '../../Dashboard/css-data-props.js';

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
    profileState: {
        CertificationState: {
            certificationList: [],
            addCertificationSuccess: true,
            certificationFieldDetails: {}
        },
        PersonalDetailState: {
            isUser: true
        }
    },
    getCertification: jest.fn(),
    addCertification: jest.fn(),
    editCertification: jest.fn(),
    updateCertification: jest.fn(),
    deleteCertification: jest.fn()
}

store = mockStore(defaultState);

describe("Certification", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <Certification dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the Certification form body', () => {
        expect(shallowWrapper.find('[test-certification="test-certification"]').length).toEqual(1);
    });

    it('should test mapStateToProps state', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
     });
  
     it('check the events', () => {   
         shallowWrapper.setProps({
            isUser: true,
            certificationList: [{
                certificationId: 1,
                certificationName: 'asd ada',
                authority: 'ada ad'
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
        expect(shallowWrapper.find('[test-editCertification="test-editCertification"]').props().onClick(e));        
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
        shallowWrapper.isImageSave = false
        const nextProps = {
            certificationFieldDetails:{ 
                certificationName :'',
                authority:'',
                licenceNumber:'',
                certificationId:''
            }
        }
        shallowWrapper.instance().componentWillReceiveProps(nextProps)
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
        shallowWrapper.setState({
            certificationName: ' asaawd aa',
            certificationAuthority: ' fdfgdf asda',
            certificateLicenceNumber : '123saasas'
        })
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
        shallowWrapper.setState({
            certificationName: 'asaawd',
            certificationAuthority: 'fdfgdf',
            certificateLicenceNumber : '123saasas'
        })
        shallowWrapper.instance().updateCertification();
    });

    it('Check the deleteCertification', () => {
        shallowWrapper.instance().deleteCertification();
    });

    it('Check the CertificationModal form body', () => {
        expect(shallowWrapper.find('.CertificationModal').length).toEqual(1);
    });

}); 