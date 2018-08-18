import React from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import { DashboardHeaderMenu } from "../../../../data/DashboardHeaderMenu";

class DashboardHeader extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            dBlock: "",
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {

        const menuList = DashboardHeaderMenu.map((menu) => {
            let menuName = menu.name;
            let Separator = "";
            if (menu.status) {
                let clsName = "navIcon icon" + menuName.charAt(0).toUpperCase() + menuName.slice(1);
                if (menuName === "notification") {
                    Separator = "NavIconSeparator"
                }
                return (
                    <NavItem className={menuName + "Widget navIconWidget " + Separator} key={menu.id}>
                        <NavLink className={clsName}
                                 href={menu.link} key={menu.id}/>
                    </NavItem>
                )
            }
        });

        return (
            <Navbar className="navbar-light navbarProfile boxShadowBottom bgWhite" expand="md">
                <NavbarToggler className={this.state.dBlock} onClick={this.props.toggle}/>
                <NavbarBrand className="text-uppercase mr-auto" href="/">Coreo Home</NavbarBrand>
                <Collapse isOpen={false} navbar>
                    <Nav className="ml-auto navIconContainer" navbar>
                        {menuList}
                    </Nav>
                </Collapse>

            </Navbar>
        );
    }
}

export default DashboardHeader;