import React from 'react'
import Enzyme, { shallow, configure, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { EntityUserMyConversionDefault } from './MyConversation'

Enzyme.configure({ adapter: new Adapter() })

describe('EntityUserMyConversionDefault', function () {
    
    it('EntityUserMyConversionDefault', () => {        
        expect(EntityUserMyConversionDefault()).toBeDefined()
    })

});