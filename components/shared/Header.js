import React, { useState } from "react";
import Link from "next/link";
import { isAuthorized } from "@/utils/auth0";
import ReactResizeDetector from "react-resize-detector";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import ActiveLink from "components/shared/ActiveLink";
const BsNavLink = (props) => {
  const { href, title, className = "" } = props;
  return (
    <ActiveLink activeClassName="active" href={href}>
      <Link
        className={`nav-link port-navbar-link ${className}`}
        title={title}
      />
    </ActiveLink>
  );
};

const BsNavBrand = () => {
  return (
    <Link className="navbar-brand port-navbar-brand" href="/">
      Luis Ruiz
    </Link>
  );
};
const LoginLink = () => (
  <Link className="nav-link port-navbar-link" href="/api/v1/login">
    Login
  </Link>
);

const LogoutLink = () => (
  <Link className="nav-link port-navbar-link" href="/api/v1/logout">
    Logout
  </Link>
);

const AdminMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dropdown
      className="port-navbar-link port-dropdown-menu"
      nav
      isOpen={isOpen}
      toggle={() => setIsOpen(!isOpen)}
    >
      <DropdownToggle className="port-dropdown-toggle" nav caret>
        Admin
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
          <BsNavLink
            className={"port-dropdown-item"}
            href="/portfolios/create"
            title="Create Portfolio"
          />
        </DropdownItem>
        {/* <DropdownItem>
          <BsNavLink
            className={"port-dropdown-item"}
            href="/blogs/editor"
            title="Blog Editor"
          />
        </DropdownItem> */}
        {/* <DropdownItem>
          <BsNavLink
            className={"port-dropdown-item"}
            href="/blogs/dashboard"
            title="Dashboard"
          />
        </DropdownItem> */}
      </DropdownMenu>
    </Dropdown>
  );
};

const Header = ({ user, loading, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <ReactResizeDetector handleWidth>
      {({ width }) => (
        <Navbar
          className={`port-navbar port-default absolute ${className} ${
            width < 688 && isOpen ? "is-open" : "is-closed"
          }`}
          dark
          expand="md"
        >
          <BsNavBrand />
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
              {/*  <NavItem className="port-navbar-item">
                <BsNavLink href="/blogs" title="Blogs" />
              </NavItem> */}
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
            <Nav navbar>
              {!loading && (
                <>
                  {user && (
                    <>
                      {isAuthorized(user, "admin") && <AdminMenu />}
                      <NavItem className="port-navbar-item">
                        <LogoutLink />
                      </NavItem>
                    </>
                  )}
                  {!user && (
                    <NavItem className="port-navbar-item">
                      <LoginLink />
                    </NavItem>
                  )}
                </>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      )}
    </ReactResizeDetector>
  );
};

export default Header;
