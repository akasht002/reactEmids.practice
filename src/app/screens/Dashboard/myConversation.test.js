import React from 'react'
import Enzyme, { shallow, configure, mount, render } from 'enzyme'
import { getPatientData } from "../../utils/userUtility";
import { Provider } from 'react-redux'
import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import sinon from 'sinon'
import {MyConversation,mapDispatchToProps, mapStateToProps} from './myConversation'

jest.mock('../../services/http', () => ({
    getUserInfo:()=>({
      serviceProviderTypeId :23,
      isEntityServiceProvider:true
    })
}))



jest.mock('./ServiceInfo', () => ({
    MyConversionDetail: 'mockMyConversionDetail',
    MyConversionDefault : 'mockMyConversionDefault ',
}))
  
jest.mock('./EntitySP/MyConversation', () => ({
    EntityUserMyConversionDefault : 'mockEntityUserMyConversionDefault '
}))

Enzyme.configure({ adapter: new Adapter() })
let store
const mockStore = configureStore()
const dispatch = sinon.spy()
const defaultState = {
    dashboardState : {
        dashboardState : { 
            conversationDetail :[],
            isConversationLoading:false
         }
    },
    authState : {
        userState: { 
            userData : {
                userInfo : {}
            }
        }
    },
    isEntityServiceProvider:true,
    asyncMessageState : { unreadCounts :34 },
    getConversationDetail: jest.fn(),
    getUnreadMessageCounts: jest.fn(),
    gotoConversation: jest.fn(),
 }

 store = mockStore(defaultState)

describe('MyConversation', function () {
  let shallowWrapper;
    beforeEach(() => {      
      shallowWrapper = shallow(
        <MyConversation dispatch={dispatch} store={store} {...defaultState} />
    )
    })

    it('Check the MyConversation Details body', () => {
        expect(shallowWrapper).toBeDefined()
    });

    it('should test initial state', () => {
        const initialState = defaultState
        expect(mapStateToProps(initialState)).toBeDefined();
    }); 

    it('Check mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getConversationDetail();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getUnreadMessageCounts();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).gotoConversation();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    it('Check the componentWillReceiveProps function', () => {
        const nextProps = {
            conversationDetail :[]
        }
        shallowWrapper.instance().componentWillReceiveProps(nextProps)
   });
   
   it('Check the onClickConversation function', () => {
    shallowWrapper.instance().onClickConversation([],{})
});
   
});