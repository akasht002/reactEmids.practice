import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { Organization, mapStateToProps, mapDispatchToProps } from './index';

Enzyme.configure({ adapter: new Adapter() })

jest.mock('../../../services/http', () => ({
    getUserInfo: () => ({
        serviceProviderId: 12
    })
}))

jest.mock('../../../utils/formatName', () => ({
    removeHyphenInPhoneNumber: () => ({
    }),
    formatPhoneNumber: () => ({})
}))

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    profileState: {
        PersonalDetailState: {
            personalDetail: [],
            updatePersonalDetailSuccess: false,
            cityDetail: 'asasds',
            imageData: 'asdsa/asdasd/ads',
            isUser: true
        }
    },
    getPersonalDetail: jest.fn(),
    getImage: jest.fn(),
    getProfilePercentage: jest.fn(),
    updateOrganizationDetail: jest.fn(),
    getCityDetail: jest.fn(),
    uploadImg: jest.fn(),
    personalDetail: {
        rating: 5,
        organization: 'sdas',
        entity: {
            organization: 'czxc'
        },
        yearOfExperience: 23,
        description: 'adxcz',
        hourlyRate: 45,
        address: [{
            city: 'asd',
            streetAddress: 'sdf',
            zipCode: 453212,
            state: {
                id: 12,
                name: 'sadasd'
            }
        }],
        phoneNumber: 9165648715

    },
    cityDetail: [{
        name: 'dsa',
        id: 12
    }]
}

store = mockStore(defaultState);

describe("Profile - Organization", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <Organization dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the Organization contains SPDetails', () => {
        expect(shallowWrapper.find('.SPDetails').length).toEqual(1);
    });

    it('Check the componentWillReceiveProps function', () => {
        let nextProps = {
            personalDetail: {
                entity: {
                    organization: 'czxc'
                },
                yearOfExperience: 23,
                description: 'adxcz',
                hourlyRate: 45,
                address: [{
                    city: 'asd',
                    streetAddress: 'sdf',
                    zipCode: 453212,
                    state: {
                        id: 12,
                        name: 'sadasd'
                    }
                }],
                phoneNumber: 9165648715
            },
            profileImgData: {
                image: 'zxcxzc/zczxcz'
            }
        }
        shallowWrapper.instance().componentWillReceiveProps(nextProps)
    });

    it('Check the handleChange function', () => {
        shallowWrapper.instance().handleChange()
    });
    
    it('Check the reUpload  function', () => {
        let e = {
            target: {
                files: [
                    {
                        name: {
                            macth: jest.fn()
                        }
                    }
                ]
            }
        }
        shallowWrapper.instance().reUpload(e)
    });

    it('Check the onCropChange function', () => {
        shallowWrapper.instance().onCropChange({})
    });

    it('Check the onSubmit function', () => {
        shallowWrapper.setState({
            city: null,
            zipCode: null,
            streetAddress: null,
            selectedState: null
        })
        shallowWrapper.instance().onSubmit()
    });

    it('Check the closeImageUpload function', () => {
        shallowWrapper.setProps({
            profileImgData: {
                image: 'zxcxzc/zczxcz'
            }
        })
        shallowWrapper.instance().closeImageUpload()
    });

    it('Check the resetImage function', () => {
        shallowWrapper.setProps({
            profileImgData: {
                image: 'zxcxzc/zczxcz'
            }
        })
        shallowWrapper.instance().resetImage()
    });

    it('Check the saveImageUpload function', () => {
        shallowWrapper.setState({
            croppedImageUrl: 209
        })
        shallowWrapper.instance().saveImageUpload()
    });

    it('Check the togglePersonalDetails function', () => {
        shallowWrapper.instance().togglePersonalDetails()
    });

    it('Check the reset function', () => {
        shallowWrapper.instance().reset()
    });

    it('Check mapStateToProps', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });

    it('Check mapDispatchToProps actions', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getPersonalDetail();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).updateOrganizationDetail({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getCityDetail();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).uploadImg();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getImage();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    }); 

});