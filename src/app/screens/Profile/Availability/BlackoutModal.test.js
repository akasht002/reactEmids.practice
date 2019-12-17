import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

 import { BlackoutModal } from './BlackoutModal';

 Enzyme.configure({ adapter: new Adapter() })

 let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    existingAvailableDays: [],
    blackoutDays: [],
    profileState: {
        AvailabilityState: {
            blackoutDays: []
        }
    },
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    closeBlackoutModal: jest.fn(),
    saveBlackout: jest.fn(),
    updateBlackOutDay: jest.fn(),
    deleteBlackoutDay: jest.fn()
}

 store = mockStore(defaultState);



 describe("AvailabilityEdit", function () {
    let shallowWrapper;

     beforeEach(() => {
        shallowWrapper = shallow(
            <BlackoutModal dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the AvailabilityEdit Details body', () => {
        expect(shallowWrapper).toBeDefined()
    }); 

    it('Check the dateChanged function', () => {
        shallowWrapper.instance().dateChanged('fromDate','2019-09-09')
    })

    it('Check the dateChanged function', () => {
        shallowWrapper.instance().dateChanged('fromDate1','2019-09-09')
    })

    it('Check the dateChangedRaw  function', () => {
        let e = {
            preventDefault (){},
            target:{value:'11/12/2019'}
        }
        shallowWrapper.instance().dateChangedRaw('fromDate',e)
        let e1 = {
            target:{value:undefined}
        }
        shallowWrapper.instance().dateChangedRaw('fromDate',e1)
    })

    it('Check the remarksChange function', () => {
        shallowWrapper.instance().remarksChange({target:{value:23}})
    })   

    it('Check the saveData function', () => {
        shallowWrapper.setState({
            blackoutData:{
            fromDate :'2019-09-09',
            toDate:'2019-09-09',
           } 
        })
        shallowWrapper.instance().saveData()
    })

    it('Check the componentWillReceiveProps function', () => {
        const nextProps = {
            itemData:{ 
                startDate :'',
                endDate:''
            }
        }
        shallowWrapper.instance().componentWillReceiveProps(nextProps)
   }); 

    it('Check the toggleCheck function', () => {
        shallowWrapper.instance().toggleCheck()
    })  
    
    it('Check the reset function', () => {
        shallowWrapper.instance().reset()
    }) 
    
        
    it('check the events', () => {
        shallowWrapper.setState({
            fromDate :'2019-09-09',
            toDate:'2019-09-09'
        })
        expect(shallowWrapper.find('[label="To Date"]').props().onBlur())
        expect(shallowWrapper.find('[label="From Date"]').props().onBlur())
        expect(shallowWrapper.find('[className="modal-sm"]').props().onCancel())
        expect(shallowWrapper.find('[className="modal-sm"]').props().onConfirm())
    })
 }); 