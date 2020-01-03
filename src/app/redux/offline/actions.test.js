import * as actions from './actions'
import fetchMock from 'fetch-mock'
import expect from 'expect' 
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
    it('should create an action to save', () => {      
      expect(actions.save(12,{})).toBeDefined()
    })  
})

describe('async actions', () => {
    afterEach(() => {
      fetchMock.restore()
    })
  
    it('check remove fn', () => {  
      const store = mockStore({ data: '' })
      return store.dispatch(actions.remove(21,()=>{}))
    })

    it('check load fn', () => {  
        const store = mockStore({ data: '' })
        return store.dispatch(actions.load(21,()=>{}))
      })
})  