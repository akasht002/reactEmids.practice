import * as actions from './actions'
import fetchMock from 'fetch-mock'
import expect from 'expect' 
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('actions', () => {
  it('should create an action to intiate app', () => {
    const expectedAction = {
      type: 'APP_INIT',
    }
    expect(actions.appInit()).toEqual(expectedAction)
  })

})


describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('check checkPrevLogin fn', () => {  
    const store = mockStore({ data: '' })
    return store.dispatch(actions.checkPrevLogin())
  })

  it('check onCheckPrevLogin fn', () => {  
    const store = mockStore({ data: '' })
    const userData =  {
      username:"Sample"
    }
    return store.dispatch(actions.checkPrevLogin(userData))
  })

  it('check onAppReady fn', () => {  
    const store = mockStore({ data: '' })
    return store.dispatch(actions.onAppReady())
  })


})