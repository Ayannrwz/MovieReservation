import React from "react";
import { Navbar, Container, Nav, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationComponent() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Col>
          <Navbar.Brand href="#home">
            <img
              // src="/path/to/your/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Website Logo"
            />
          </Navbar.Brand>
        </Col>

        <Col>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Nav className="text-center justify-content-center">
            <Nav.Link as={Link} to="/">
              Movies
            </Nav.Link>
            <Nav.Link as={Link} to="/cancelticket">
              Cancel Reservation
            </Nav.Link>
          </Nav>
        </Col>

        <Col className="text-end">
          <Navbar.Text>
            <Link to="/login">Username</Link>
          </Navbar.Text>
          <img
            // src="/path/to/your/user-logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="User Logo"
          />
        </Col>
      </Container>
    </Navbar>
  );
}

export default NavigationComponent;
