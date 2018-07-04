import React from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink, } from 'reactstrap';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            dBlock: "",
            menus: [
                {
                    name: "Home",
                    label: "Home",
                    link: "/",
                    role: "link",
                    status: false
                },
                {
                    name: "Login",
                    label: "Login",
                    link: "login",
                    role: "button",
                    status: false
                },
                {
                    name: "Contact",
                    label: "icon-contact",
                    link: "login",
                    role: "Outerlink",
                    status: false
                }
            ]
        };
    }

    componentDidMount(){
        if(this.props.menuArray){
            this.props.menuArray.map((menu) => {
                return this.onMenu(menu);
            });
        }
    }

    onMenu(menuVal){
        let menus = this.state.menus.map((menu) => {
            if(menu.name.toLowerCase() === menuVal.toLowerCase()){
                menu.status = true;
                if(menu.role === 'Outerlink'){
                    this.setState({
                        dBlock: "d-none"
                    });
                }
            }
            return menu;
        });
        this.setState({
            menus:menus
        });
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {

        const menuList = this.state.menus.map((menu) => {
            if (menu.status && menu.role !== "Outerlink") {
                let clsName = "btn btn-primary";
                let menuName = menu.label;
                if(menu.role === "link"){
                    clsName = ""
                }
                if(menu.label !== menu.name){
                    clsName += "icon "+menu.label;
                    menuName = "";
                }
                return (
                    <NavItem>
                        <NavLink className={clsName}
                              href={menu.link}> {menuName}</NavLink>
                    </NavItem>
                )
            }
            return true;
        });

        const OuterLink = this.state.menus.map((menu)=>{
            if (menu.status) {
                if(menu.role === "Outerlink") {
                    let clsName = "";
                    let menuName = menu.label;
                    if(menu.label !== menu.name){
                        clsName += "menuRightIcon icon "+menu.label;
                        menuName = "";
                    }
                    return (
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink className={clsName}
                                     href={menu.link}> {menuName}</NavLink>
                            </NavItem>
                        </Nav>
                    )
                }
            }
            return true;
        });

        return (
                <Navbar className="navbar-light boxShadowBottom" expand="md">
                    <NavbarBrand className="text-uppercase px-3" href="/">Coreo Home</NavbarBrand>
                    <NavbarToggler className={this.state.dBlock} onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {menuList}
                        </Nav>
                    </Collapse>
                    {OuterLink}
                </Navbar>
        );
    }
}

export default Header;