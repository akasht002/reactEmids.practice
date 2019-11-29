import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AsideMenu } from './index'
import { PERMISSIONS } from '../../../constants/constants';

Enzyme.configure({ adapter: new Adapter() })

describe('AsideMenu', () => {
    let wrapper;
    let clickedMenu;
    let menuData = [
        {
            id: 0,
            title: 'Dashboard',
            iconName: 'iconAsideMenu iconAsideMenuDashboard',
            link: '/dashboard',
            name: 'Dashboard'
        }
    ]
    beforeEach(() => {
        clickedMenu = '';
        wrapper = mount(
            <AsideMenu
                menuData={menuData}
                url={
                    {
                        location: {
                            pathname: '/dashboard'
                        }
                    }
                }
                onClick={(link) => {
                    clickedMenu = link;
                }}
            />
        )
    })

    it('should return active menu clicked', () => {
        expect(wrapper.find('.profileSideNavigationList').length).toEqual(1)
    })

    it('should return profileSideNavigationLink', () => {
        expect(wrapper.find('.profileSideNavigationLink').props().onClick())
    })

}); 	