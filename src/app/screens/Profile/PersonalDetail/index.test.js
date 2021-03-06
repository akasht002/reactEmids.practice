import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

 import { PersonalDetail, mapDispatchToProps, mapStateToProps  } from './index.js';

 jest.mock('../../../components', () => ({
    ScreenCover: 'mockScreenCover'
}))

jest.mock('../../../services/http', () => ({
    getUserInfo: () => ({
        serviceProviderId: 12
    })
}))

 Enzyme.configure({ adapter: new Adapter() })

 let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
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
    getGender: jest.fn(),
    personalDetail: {
        firstName:'',
        lastName:'',
        address:[{
            city:'city',
            streetAddress:'streetAddress',
            zipCode:'zipCode',
            state:{name:'sasa', id: 1},
        }],
        age:'',
        affiliationName: '',
        organization: '',
        yearOfExperience: 23,
        description: 'sad',
        hourlyRate: 12,
        genderName:'',
        addressTypeId: 2
    }
}

 store = mockStore(defaultState);

 describe("PersonalDetail", function () {
    let wrapper;

     beforeEach(() => {
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
        let data = {
            selectedGender: {
                value: 'male'
            },
            description: [{id: 1}]
        }
        mapDispatchToProps(dispatch).getPersonalDetail();
        mapDispatchToProps(dispatch).getAffiliationDetail();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).updatePersonalDetail(data);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getCityDetail();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).uploadImg({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();        
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
                image :''
            },
            personalDetail: {
                firstName:'',
                lastName:'',
                address:[{
                    city:'city',
                    streetAddress:'streetAddress',
                    zipCode:'zipCode',
                    state:{name:'sasa', id: 1},
                }],
                age:'',
                affiliationName: '',
                organization: '',
                yearOfExperience: 23,
                description: 'sad',
                hourlyRate: 12,
                genderName:'',
                addressTypeId: 2
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
            image :''
        },
        personalDetail: {
            firstName:'',
            lastName:'',
            address:[{
                city:'city',
                streetAddress:'streetAddress',
                zipCode:'zipCode',
                state:{name:'sasa', id: 1},
            }],
            age:'',
            affiliationName: '',
            organization: '',
            yearOfExperience: 23,
            description: 'sad',
            hourlyRate: 12,
            genderName:'',
            addressTypeId: 2
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
            croppedImageUrl: 10200
        })
        wrapper.instance().saveImageUpload()
        wrapper.setState({
            croppedImageUrl: 2097152
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
        wrapper.instance().textChangeContactNumber({ target: { value: '122222222' } });
        wrapper.instance().textChangeContactNumber({ target: { value: '12222221231232' } });
        wrapper.instance().textChangeContactNumber({ target: { value: '1234567890' } });
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
        expect(wrapper.find('[test-discardPopup="test-discardPopup"]').props().onConfirm())
        expect(wrapper.find('[test-discardPopup="test-discardPopup"]').props().onCancel())
        expect(wrapper.find('[test-sizePopup="test-sizePopup"]').props().onConfirm())
        expect(wrapper.find('[test-sizePopup="test-sizePopup"]').props().onCancel())
        expect(wrapper.find('[test-savePopup="test-savePopup"]').props().onConfirm())
        expect(wrapper.find('[test-savePopup="test-savePopup"]').props().onCancel())
    })

 }); 