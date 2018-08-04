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
} from 'reactstrap';
import { SearchInput } from "../../../components";
import { ProfileHeaderMenu } from "../../../data/ProfileHeaderMenu";
import { onLogout } from '../../../redux/auth/logout/actions';
import { makeProperCase } from '../../../utils/stringHelper';

class ProfileHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            dBlock: "",
        };
    }

    toggleAsideMenu = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleNavigation = (event) =>{
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
                    <NavItem className={menuName + "Widget navIconWidget " + separator}>
                        <NavLink className={clsName} title={menuName}
                            href={menu.link} onClick={this.handleNavigation} />
                    </NavItem>
                )
            }
            return menuList;
        });

        return (
            <Navbar className="navbar-light navbarProfile boxShadowBottom bgWhite" expand="md">
                <NavbarBrand className="text-uppercase">Coreo Home</NavbarBrand>
                <NavbarToggler className={this.state.dBlock} onClick={this.toggleAsideMenu} />
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

function mapDispatchToProps(dispatch) {
    return {
        onLogout: () => dispatch(onLogout())
    }
  }
  
export default connect(null, mapDispatchToProps)(ProfileHeader);