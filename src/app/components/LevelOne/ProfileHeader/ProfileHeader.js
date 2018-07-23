import React from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink, } from 'reactstrap';
import { SearchInput } from "../../../components";

class ProfileHeader extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            dBlock: "",
            menus: [
                {
                    name: "contact",
                    status: true
                },
                {
                    name: "videoChat",
                    status: true
                },
                {
                    name: "messages",
                    status: true
                },
                {
                    name: "notification",
                    status: true
                }
            ]
        };
    }

    componentDidMount(){
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
            if(menu.status) {
                let clsName = "navIcon icon" + menuName.charAt(0).toUpperCase() + menuName.slice(1);
                if(menuName === "notification"){
                    Separator = "NavIconSeparator"
                }
                return (
                    <NavItem className={menuName+"Widget navIconWidget "+Separator}>
                        <NavLink className={clsName}
                                 href={menu.link} />
                    </NavItem>
                )
            }
        });

        return (
            <Navbar className="navbar-light navbarProfile boxShadowBottom bgWhite" expand="md">
                <NavbarBrand className="text-uppercase">Coreo Home</NavbarBrand>
                <NavbarToggler className={this.state.dBlock} onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav navbar className="SearchWidget width100">
                        <SearchInput
                            name="search"
                            autoComplete="off"
                            placeholder="search your keyword"
                            className="form-control SearchInput"
                            iconName="searchInputIcon"
                        />
                    </Nav>
                    <Nav className="ml-auto navIconContainer" navbar>
                        {menuList}
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default ProfileHeader;