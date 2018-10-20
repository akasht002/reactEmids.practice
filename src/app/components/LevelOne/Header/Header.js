import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import { PropTypes } from 'prop-types';
import './styles.css';

class CoreoWizHeader extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
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
                    link: "login",
                    status: true,
                }
            ]
        };
    }

    componentDidMount() {
        this.onMenu();
    }

    onMenu = () => {
        let menus = this.state.menus.filter((menu) => {
            return this.props.menuArray.includes(menu.name);
        });
        this.setState({
            menus: menus
        });
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {

        const menuList = this.state.menus.map((menu) => {
            let menuName = menu.name;
            let Separator = "";
            if (menu.status) {
                let clsName = "navIcon icon" + menuName.charAt(0).toUpperCase() + menuName.slice(1);
                if (menuName === "notification") {
                    Separator = "NavIconSeparator"
                }
                return (
                    <NavItem className={menuName + "Widget navIconWidget " + Separator}>
                        <NavLink className={clsName}
                            onClick={() => { this.props.onClick(menu.link) }} />
                    </NavItem>
                )
            }
            return true;
        });

        return (
            <Navbar className="navbar-light boxShadowBottom bgWhite" expand="md">
                <NavbarBrand className="text-uppercase px-3"><img src={require('../../../assets/images/logo/CoreoHomeGray.png')} alt="coreoLogo" /></NavbarBrand>
                <NavbarToggler className={this.state.dBlock} onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {menuList}
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

CoreoWizHeader.propTypes = {
    menuArray: PropTypes.array
}

export default CoreoWizHeader;