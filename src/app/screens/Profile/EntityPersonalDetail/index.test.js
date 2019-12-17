import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';

import { EntityPersonalDetail, mapDispatchToProps, mapStateToProps } from './index.js';


// jest.mock('../AuthCover', () => ({
//   AuthCover: 'mockAuthover'
// }))

Enzyme.configure({ adapter: new Adapter() })

let wrapper, store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
profileState:{
    PersonalDetailState:{
        personalDetail:{}
    },
    updatePersonalDetailSuccess:true,
    cityDetail: [{}],
    },
  loadingState : { isLoading :true },  
  personalDetail: {
    address:[],
},
updatePersonalDetailSuccess: true,
personalDetail:{},
cityDetail: [{}],
profileImgData: '',
genderList: [{}],
isLoading:  true,
isUser:  true,
getPersonalDetail:jest.fn(),
updateEntityDetail: jest.fn(),
getCityDetail: jest.fn(),
uploadImg: jest.fn(),
getImage: jest.fn(),
getGender: jest.fn()
};

store = mockStore(defaultState);



describe("EntityPersonalDetail Component", function () {
  let wrapper;

  beforeEach(() => {
    const props = defaultState;
    wrapper = shallow(
        <EntityPersonalDetail  dispatch={dispatch} store={store} {...defaultState} />
    )
    wrapper.setState({
        showModalOnCancel: false,
        firstName: '',
        lastName: '',
        contactNumber: ''
    })
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
        mapDispatchToProps(dispatch).updateEntityDetail();
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

   it('Check the handleChange function', () => {
      wrapper.instance().handleChange()
   })

   it('Check the reUpload function', () => {
    wrapper.instance().reUpload(
        { 
            target: {
                files : [{name:'.jpg'}]
            }
        }
        )
   })

   it('Check the reUpload function', () => {
    wrapper.instance().reUpload(
        { 
            target: {
                files : [{name:'.jeepg'}]
            }
        }
        )
   })

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

    it('Check the onCropChange function', () => {
        wrapper.instance().onCropChange({crop:'crop'})
    })

    it('Check the changeCroppedImage function', () => {
        wrapper.instance().changeCroppedImage({crop:'crop'})
    })

    it('Check the togglePersonalDetails function', () => {
        wrapper.instance().togglePersonalDetails({crop:'crop'},{})
    })

    it('Check the reset function', () => {
        wrapper.instance().reset()
    })

    
});