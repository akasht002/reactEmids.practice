import * as actions from './actions'
import fetchMock from 'fetch-mock'
import expect from 'expect' 
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('actions', () => {
  it('should create an action to getAboutUsContent', () => {
    const data = 'Finish docs'
    const expectedAction = {
      type: 'getAboutUsContentSuccess/AboutUs',
      data
    }
    expect(actions.getAboutUsContentSuccess(data)).toEqual(expectedAction)
  })

  it('should create an action to getBuildVersion', () => {
    const data = 'Finish docs'
    const expectedAction = {
      type: 'getBuildVersionSuccess/AboutUs',
      data
    }
    expect(actions.getBuildVersionSuccess(data)).toEqual(expectedAction)
  })
})

  describe('async actions', () => {
    afterEach(() => {
      fetchMock.restore()
    })
  
    it('creates getAboutUsContentSuccess when fetching aboutUs content has been done', () => {
      fetchMock.getOnce('Common/LookupConfig/AboutUsWeb', {
        body: { AboutUs: 'content' },
        headers: { 'content-type': 'application/json' }    
        })
  
     
    
      const store = mockStore({ AboutUs: '' })
  
      return store.dispatch(actions.getAboutUsContent()).then(() => {
        // return of async actions
        expect(store.getActions()).toBeDefined()
      })
    })

    it('creates getBuildVersion when fetching aboutUs content has been done', () => {
      fetchMock.getOnce('Common/LookupConfig/AboutUsWeb', {
        body: { AboutUs: 'content' },
        headers: { 'content-type': 'application/json' }
      }) 
    
    
      const store = mockStore({ BuildVersion: '' })
  
      return store.dispatch(actions.getBuildVersion()).then(() => {
        // return of async actions
        expect(store.getActions()).toBeDefined()
      })
    })
  })

  

