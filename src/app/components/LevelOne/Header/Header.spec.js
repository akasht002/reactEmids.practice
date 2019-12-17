import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Header } from './index'

Enzyme.configure({ adapter: new Adapter() })

describe('AsideMenu', () => {
    let wrapper;
    let clickedMenu;
    let menuData = [
        {
            name: "search",
            link: "/",
            status: true,
        },
    ]
    beforeEach(() => {
        clickedMenu = '';
        wrapper = mount(
            <Header
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
        wrapper.instance().setState({
            isOpen: false,
            dBlock: "",
            menus: [
                {
                    name: "search",
                    link: "/",
                    status: true,
                },
                {
                    name: "contact",
                    link: "contact",
                    status: true,
                },
                {
                    name: "videoChat",
                    link: 'telehealth',
                    status: true,
                },
                {
                    name: "messages",
                    link: "messagesummary",
                    status: true,
                },
                {
                    name: "notification",
                    link: "visitNotification",
                    status: true,
                }
            ]
        })
        expect(wrapper).toBeDefined()
    })

    it('should return active menu clicked', () => {
        wrapper.instance().componentDidMount()
    })

    it('should return active menu clicked', () => {
        wrapper.instance().onMenu()
    })

    it('should return active menu clicked', () => {
        wrapper.instance().toggle()
    })
}); 	