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
            personalDetail: {
                firstName:'',

            },
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
    let wrapper;

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
        wrapper.setProps({
            selectedAffiliation:{
                label: "",
                value: ""
      
            }
        })
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getPersonalDetail();
        mapDispatchToProps(dispatch).getAffiliationDetail();
        mapDispatchToProps(dispatch).updatePersonalDetail();
        mapDispatchToProps(dispatch).getCityDetail();
        mapDispatchToProps(dispatch).uploadImg();       
        mapDispatchToProps(dispatch).getImage();
        mapDispatchToProps(dispatch).getGender();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    it('should test mapStateToProps state', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });

    it('Check the componentWillReceiveProps1 function', () => {
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
            },
            personalDetail:{
                affiliationName:'',
                affiliationId:234,

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

   it('Check the componentWillReceiveProps2 function', () => {
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
        },
        personalDetail:{
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

   it('Check the componentWillReceiveProps3 function', () => {
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
        },
        personalDetail:{
            affiliationName:'',
            affiliationId:234,
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

     it('Check the reUpload1', () => {
        wrapper.instance().reUpload({ target: { files: [{name:'.jpg'}] } });
    });

    it('Check the reUpload2', () => {
        wrapper.instance().reUpload({ target: { files: [{name:'.jepg'}] } });
    });

    it('Check the onSubmit1 function', () => {
        wrapper.instance().onSubmit()
       })
    
    it('Check the onSubmit2 function', () => {
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

    it('Check the onSubmit function', () => {
        wrapper.setState({
            firstName :"dsf", lastName:"df", phoneNumber :123456789, city:"sdf", zipCode:44444, streetAddress:"sdf", selectedState:'sdf'
        })
        wrapper.instance().onSubmit()
    })

    it('Check the closeImageUpload function', () => {
        wrapper.isChangePhoto  = false
        wrapper.instance().closeImageUpload()
    })

    it('Check the closeImageUpload function', () => {
        wrapper.setProps({profileImgData:{image:"sdfsdfsdf"}})
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

    it('Check the saveImageUpload function', () => {
        wrapper.setState({
            croppedImageUrl:''
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
        wrapper.instance().textChangeContactNumber({ target: { value: 123456789 } });
    });

    it('Check the textChangeContactNumber', () => {
        wrapper.instance().textChangeContactNumber({ target: { value: 1234567892 } });
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

    it('Check the events', () => {
        expect(wrapper.find('[test-reset="test-reset"]').props().onConfirm())
        expect(wrapper.find('[test-reset="test-reset"]').props().onCancel())
        // expect(shallowWrapper.find('[test-alertPopup="test-alertPopup"]').props().onConfirm())
        // expect(shallowWrapper.find('[test-alertPopup="test-alertPopup"]').props().onCancel())
        // expect(shallowWrapper.find('.form-radio-input').props().onChange({target:{checked: true}}))
        // expect(shallowWrapper.find('.requestImageContent').props().onClick())
        // expect(shallowWrapper.find('[test-goBack="test-goBack"]').props().onClick())
        // expect(shallowWrapper.find('[test-stopButton="test-stopButton"]').props().onClick())
    });


 }); 