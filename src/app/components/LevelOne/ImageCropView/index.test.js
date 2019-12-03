import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon';
import ImageCropView from './'

Enzyme.configure({ adapter: new Adapter() })

let store;
const dispatch = sinon.spy();

const defaultState = {
    uploadedImageFile: '',
    crop: '',
    onCropChange: jest.fn(),
    changeCroppedImage:jest.fn()
}

describe("ImageCropView", function () {
    let wrapper;

    wrapper = shallow(
        <ImageCropView dispatch={dispatch} store={store} {...defaultState} />
    )

    it('Check the Filter Details body', () => {
        expect(wrapper).toBeDefined()
    });
});