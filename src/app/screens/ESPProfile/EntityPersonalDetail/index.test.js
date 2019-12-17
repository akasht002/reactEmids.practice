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
  patientProfileState : {
    espPatient:[{}],
    espimageData:'',
    espID:6565
  },
  loadingState : { isLoading :true },  
  personalDetail: {
    address:[],
  },
  getPersonalDetail: jest.fn(),
  getImage: jest.fn()
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
        mapDispatchToProps(dispatch).getImage();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    it('should test mapStateToProps state', () => {
    expect(mapStateToProps(defaultState)).toBeDefined();
    });

    it('Check the componentWillReceiveProps function', () => {
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

    
});