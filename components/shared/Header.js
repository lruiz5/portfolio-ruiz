import React, { useState } from "react";
import Link from "next/link";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";

const BsNavLink = (props) => {
  const { href, title } = props;
  return (
    <Link className="nav-link port-navbar-link" href={href}>
      {title}
    </Link>
  );
};
const LoginLink = () => <BsNavLink href="/api/v1/login" title="Login" />;

const LogoutLink = () => <BsNavLink href="/api/v1/logout" title="Logout" />;

const Header = ({ user, loading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar
        className="port-navbar port-default absolute"
        color="transparent"
        dark
        expand="md"
      >
        <div>
          <Link className="port-navbar-brand" href="/">
            Luis Ruiz
          </Link>
        </div>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/" title="Home" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/about" title="About" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/portfolios" title="Portfolios" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/blogs" title="Blogs" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/cv" title="Cv" />
            </NavItem>
            {/* <NavItem className="port-navbar-item">
              <BsNavLink href="/secret" title="Secret" />
            </NavItem>{" "}
            <NavItem className="port-navbar-item">
              <BsNavLink href="/secretssr" title="Secret SSR" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/onlyadmin" title="Admin O" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/onlyadminssr" title="Admin SSR" />
            </NavItem> */}
          </Nav>
          <Nav navbar className="absolute right-align">
            {!loading && (
              <NavItem className="port-navbar-item">
                {user ? <LogoutLink /> : <LoginLink />}
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
