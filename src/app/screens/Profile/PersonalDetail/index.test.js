import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

 import { PersonalDetail, mapDispatchToProps, mapStateToProps  } from './index.js';

 jest.mock('../../../components', () => ({
    ScreenCover: 'mockScreenCover'
}))

 Enzyme.configure({ adapter: new Adapter() })

 let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    personalDetail: {},
    updatePersonalDetailSuccess: false,
    cityDetail: [{}],
    imageData: '',
    genderList: [{}],
    affiliationList:[{}],
    spBusyInVisit: null,
    sbModeClicked: false,
    serviceProviderId: null,
    isUser: true,
    serviceProviderTypeId: 0,
    isEntityServiceProvider: false,
    entityId: null,
    profileImgData:'',
    profileState: {
        PersonalDetailState: {
            personalDetail: [],
            updatePersonalDetailSuccess: false,
            cityDetail: [{id :'',name:''}],
            imageData: '',
            genderList: [{id :'',name:''}],
            affiliationList: [{affiliationId :'',name:''}],
            spBusyInVisit: null,
            sbModeClicked: false,
            serviceProviderId: null,
            isUser: true,
            serviceProviderTypeId: 0,
            isEntityServiceProvider: false,
            entityId: null
        }
    },
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    loadingState : { isLoading :true },
    selectedAffiliation:[],
    getPersonalDetail: jest.fn(),
    getAffiliationDetail: jest.fn(),
    updatePersonalDetail: jest.fn(),
    getCityDetail: jest.fn(),
    uploadImg: jest.fn(),
    getImage: jest.fn(),
    getGender: jest.fn()
}

 store = mockStore(defaultState);

 const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <PersonalDetail dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

 describe("PersonalDetail", function () {
    let wrapper, shallowWrapper;

     beforeEach(() => {
        const props = defaultState;
        // wrapper = setUp(props);
        wrapper = shallow(
            <PersonalDetail dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the EntityPersonalDetail Details body', () => {
        wrapper.setState({
        })
        expect(wrapper).toBeDefined()
    }); 

    it('Check the mapDispatchToProps fn()', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getPersonalDetail();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getAffiliationDetail();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).updatePersonalDetail();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getCityDetail();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).uploadImg();
        expect(dispatch.mock.calls[0][0]).toBeDefined();        
        mapDispatchToProps(dispatch).getImage();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getGender();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    it('should test mapStateToProps state', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });

    it('Check the componentWillReceiveProps function', () => {
        wrapper.isImageSave = false
        const nextProps = {
            profileImgData:{ 
                image :'',
                firstName:'',
                lastName:'',
                age:'',
                genderName:'',
                address:[{
                    city:'city',
                    streetAddress:'streetAddress',
                    zipCode:'zipCode',
                    state:{name:''},
                }]
            }
        }
        wrapper.instance().componentWillReceiveProps(nextProps)
   }); 

   it('Check the componentWillReceiveProps function', () => {
    wrapper.isImageSave = true
    const nextProps = {
        profileImgData:{ 
            image :'',
            firstName:'',
            lastName:'',
            age:'',
            genderName:'',
            address:[{
                city:'city',
                streetAddress:'streetAddress',
                zipCode:'zipCode',
                state:{name:''},
            }]
        }
    }
    wrapper.instance().componentWillReceiveProps(nextProps)
   });

     it('Check the handleChange', () => {
        wrapper.instance().handleChange();
    });

     it('Check the reUpload', () => {
        wrapper.instance().reUpload({ target: { files: [{name:'.jpg'}] } });
    });

    it('Check the reUpload', () => {
        wrapper.instance().reUpload({ target: { files: [{name:'.jepg'}] } });
    });

    it('Check the onSubmit function', () => {
        wrapper.instance().onSubmit()
       })
    
    it('Check the onSubmit function', () => {
        wrapper.setState({
            firstName :"test", lastName:"test", phoneNumber :123456789, city:"test", zipCode:78967, streetAddress:"test", selectedState:'test'
        })
        wrapper.instance().onSubmit()
    })

    it('Check the onSubmit function', () => {
        wrapper.setState({
            firstName :"", lastName:"", phoneNumber :123456789, city:"", zipCode:0, streetAddress:"", selectedState:''
        })
        wrapper.instance().onSubmit()
    })

    it('Check the closeImageUpload function', () => {
        wrapper.isChangePhoto  = false
        wrapper.instance().closeImageUpload()
    })

    it('Check the saveImageUpload function', () => {
        wrapper.setState({
            croppedImageUrl:'test'
        })
        wrapper.instance().saveImageUpload()
    })

    it('Check the saveImageUpload function', () => {
        wrapper.setState({
            croppedImageUrl:'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest'
        })
        wrapper.instance().saveImageUpload()
    })

    it('Check the resetImage function', () => {
        wrapper.instance().resetImage()
    })

    it('Check the togglePersonalDetails', () => {
        wrapper.instance().togglePersonalDetails({},{});
    });

     it('Check the checkAffiliationValue true', () => {
        wrapper.instance().checkAffiliationValue('TEST');
    });

     it('Check the checkAffiliationValue false', () => {
        wrapper.instance().checkAffiliationValue('');
    });

     it('Check the textChangeContactNumber', () => {
        wrapper.instance().textChangeContactNumber({ target: { value: 122222222 } });
    });

     it('Check the reset', () => {
        wrapper.instance().reset();
    });

    it('Check the onCropChange function', () => {
        wrapper.instance().onCropChange({crop:'crop'})
    })

    it('Check the getBlackModalContent function', () => {
        wrapper.instance().getBlackModalContent()
    })

    it('Check the renderDetails function', () => {
        wrapper.instance().renderDetails()
    })


 }); 