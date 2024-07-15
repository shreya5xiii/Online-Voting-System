import React, { useState } from "react";
import { Container, Navbar, Nav, NavLink } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
export default function Navcomponent() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary ">
        <Container fluid>
          <Navbar.Brand href="#">Navbar</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setVisible(!visible)}
          />
          <Navbar.Collapse id="basic-navbar-nav" in={visible}>
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                active
              >
                Home
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  window.scrollTo({ top: 675, behavior: "smooth" });
                }}
              >
                Admin
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  window.scrollTo({ top: 1370, behavior: "smooth" });
                }}
              >
                Voter
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
