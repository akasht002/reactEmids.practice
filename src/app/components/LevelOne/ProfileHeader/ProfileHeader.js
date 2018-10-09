import React, { Component } from "react";
import { connect } from 'react-redux';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';
import { SearchInput } from "../../../components";
import { ProfileHeaderMenu } from "../../../data/ProfileHeaderMenu";
import { onLogout } from '../../../redux/auth/logout/actions';
import { makeProperCase } from '../../../utils/stringHelper';

class ProfileHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDownOpen: false,
            dBlock: "",
        };
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    handleNavigation = (event) => {
        switch (event.target.title) {
            case "logout":
                this.props.onLogout();
                break;
            default:
                break;
        }
    }

    render() {
        const menuList = ProfileHeaderMenu.map((menu) => {
            let menuName = menu.name;
            let separator = "";
            if (menu.status) {
                let clsName = "navIcon icon" + makeProperCase(menuName);
                if (menuName === "notification") {
                    separator = "NavIconSeparator"
                }
                return (
                    <NavItem className={menuName + "Widget navIconWidget " + separator} key={menu.id}>
                        <NavLink className={clsName} key={menu.id} onClick={() => { this.props.onClick(menu.link) }} />
                    </NavItem>
                )
            }
            return menuList;
        });

        return (
            <Navbar className="navbar-light navbarProfile boxShadowBottom bgWhite" expand="md">
                <NavbarToggler className={this.state.dBlock} onClick={this.props.toggle} />
                <Collapse isOpen={false} navbar>
                    <Nav navbar className="SearchWidget width100">
                        <SearchInput
                            name="search"
                            autoComplete="off"
                            placeholder="search your keyword"
                            className="form-control SearchInput"
                            iconName="searchInputIcon"
                            disable={"true"}
                        />
                    </Nav>
                    <Nav className="ml-auto navIconContainer" navbar>
                        {menuList}
                    </Nav>
                </Collapse>
                <Dropdown nav isOpen={this.state.dropdownOpen} toggle={() => {this.setState({dropdownOpen: !this.state.dropdownOpen})}}>
                    <DropdownToggle nav className="ProfileIcon"><img className="ProfileImage" src={this.props.profilePic}/></DropdownToggle>
                    <DropdownMenu right>
                        <NavLink href='#/profile'>My Profile</NavLink>
                        <NavLink href='#/settings'>Settings</NavLink>
                        <NavLink onClick={() => this.props.onClick('logout')}>Logout</NavLink>
                    </DropdownMenu>
                </Dropdown>
            </Navbar>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onLogout: () => dispatch(onLogout())
    }
}

export default connect(null, mapDispatchToProps)(ProfileHeader);