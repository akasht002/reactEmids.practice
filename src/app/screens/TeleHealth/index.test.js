import React from 'react'
import Enzyme, { shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon'
import { TeleHealth ,mapDispatchToProps, mapStateToProps} from './index'

jest.mock('../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
  }))
  
jest.mock('./TeleHealthWidget', () => ({
    TeleHealthWidget: 'mockTeleHealthWidget'
}))
  
Enzyme.configure({ adapter: new Adapter() })
let store
const mockStore = configureStore()
const dispatch = sinon.spy()
const defaultState = {
    telehealthState : { 
        token :true,
        roomId:23
    },
    generateToken: jest.fn(),
    clearRoom:  jest.fn()

 }

store = mockStore(defaultState)

describe('TeleHealth', function () {
  let shallowWrapper;
    beforeEach(() => {      
      shallowWrapper = shallow(
        <TeleHealth dispatch={dispatch} store={store} {...defaultState} />
    )
    })

    it('Check the TeleHealth Details body', () => {
        expect(shallowWrapper).toBeDefined()
    });
    it('should test initial state', () => {
        const initialState = defaultState
        expect(mapStateToProps(initialState)).toBeDefined();
    }); 

    it('Check mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).generateToken();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).clearRoom();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    it('Check the componentDidUpdate function', () => {
      shallowWrapper.instance().componentDidUpdate()
   });

   it('Check the componentWillUnmount function', () => {
        shallowWrapper.instance().componentWillUnmount()
    });
});