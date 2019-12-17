import React from 'react'
import {Carousel} from './index'
import renderer from 'react-test-renderer'


test('Carousel Component Testing', () => {
    const  ServiceTypeSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        variableWidth: true
    }
  const component = renderer.create(<Carousel {...ServiceTypeSettings}/>)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
